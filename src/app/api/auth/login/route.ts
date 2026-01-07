// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

console.log('🔧 Login API route loaded');

// Create Supabase client with service role key to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side operations
);

export async function POST(request: NextRequest) {
  console.log('📥 Login API called');
  
  try {
    const body = await request.json();
    console.log('📦 Request body:', { username: body.username, hasPassword: !!body.password });
    
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log('🔍 Querying database for username:', username);

    // Fetch moderator from database
    const { data: moderator, error } = await supabase
      .from('moderators')
      .select('moderator_id, username, password_hash, role, is_active, last_login')
      .eq('username', username)
      .single();

    console.log('📊 Database query result:', {
      found: !!moderator,
      error: error?.message,
      username: moderator?.username,
      role: moderator?.role,
      isActive: moderator?.is_active
    });

    if (error || !moderator) {
      console.log('❌ Moderator not found or database error:', error?.message);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!moderator.is_active) {
      console.log('❌ Account is disabled for:', username);
      return NextResponse.json(
        { error: 'Account is disabled' },
        { status: 403 }
      );
    }

    console.log('🔐 Verifying password...');
    console.log('Password hash length:', moderator.password_hash?.length);
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, moderator.password_hash);
    
    console.log('🔑 Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for username:', username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Don't send password_hash to client
    const { password_hash, ...moderatorData } = moderator;

    console.log('✅ Login successful for:', username);

    return NextResponse.json(
      {
        success: true,
        moderator: moderatorData,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('💥 Login error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
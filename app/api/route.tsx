
import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless';
export const dynamic = 'force-static'
export const revalidate = 60 

export async function GET () {
    if (!process.env.DATABASE_URL) {
        return  NextResponse.json({message: null});
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql('SELECT * FROM auth');
    return  NextResponse.json({ message:  data});

}



import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
import {Database} from './../../database.types'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jpgfetlaolflfbczntck.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZ2ZldGxhb2xmbGZiY3pudGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4ODYzMTUsImV4cCI6MjAzOTQ2MjMxNX0.0qkyBqdOticIo7f-QiKXMFBxg1-JX_jKarJPMrBSFg8";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export  { supabase };
        
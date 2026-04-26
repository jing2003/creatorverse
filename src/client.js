import { createClient } from "@supabase/supabase-js";

const URL = "https://mdulzsecazagqievnyqh.supabase.co";
const API_KEY = "sb_publishable_Yb5HZgGapbFe2uXMYtAsMA_Bw6TDZW6";

export const supabase = createClient(URL, API_KEY);

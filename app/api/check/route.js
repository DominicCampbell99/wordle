import wordsFile from "@/utils/wordFileReader";
import { NextResponse } from "next/server";

function searchWord(word, text) {
    const lines = text.split('\n');
    const found = [];
    lines.forEach(line => {
        if (line.includes(word)) {
            found.push(line.trim()); // Trim removes leading/trailing whitespace
        }
    });
    return found;
}

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const word = searchParams.get('word');

    const results = searchWord(word, wordsFile);
    
    if (results.length > 0) {
        return NextResponse.json({ exists: true },);
    } else {
        return NextResponse.json({ exists: false},);
    }
}
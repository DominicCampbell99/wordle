import { NextResponse } from "next/server";
import { readFile } from 'fs/promises';

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

    const words = await readFile('sgb-words.txt', 'utf8')
    const results = searchWord(word, words);
    
    if (results.length > 0) {
        console.log(`The word was found`);
        results.forEach(result => {
            console.log(result);
        });
        return NextResponse.json({ exists: true },);
    } else {
        return NextResponse.json({ exists: false},);
    }
}
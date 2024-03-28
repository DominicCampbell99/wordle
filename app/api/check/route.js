import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

function searchWord(word, data) {
    const found = [];
    data.forEach(line => {
        if (line.includes(word)) {
            found.push(line);
        }
    });
    return found;
}

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const word = searchParams.get('word');
    const wordsFile = await fs.readFile(process.cwd() + '/5-letter-words.json', 'utf8');
    const words = JSON.parse(wordsFile)
    const results = searchWord(word, words);
    
    if (results.length > 0) {
        return NextResponse.json({ exists: true },);
    } else {
        return NextResponse.json({ exists: false},);
    }
}
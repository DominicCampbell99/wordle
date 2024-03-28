import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

function getRandomWord(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomWord = data[randomIndex];
    return randomWord;
}


export async function GET(req) {
    const filePath = path.join(process.cwd(), '5-letter-words.json')
    const wordsFile = fs.readFileSync(filePath);
    const words = JSON.parse(wordsFile)
    const randomFiveLetterWord = getRandomWord(words);
    return NextResponse.json({ word: randomFiveLetterWord});
}
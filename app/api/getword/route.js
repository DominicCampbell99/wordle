import { NextResponse } from "next/server";
import { promises as fs } from 'fs';


function getRandomWord(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomWord = data[randomIndex];
    return randomWord;
}


export async function GET(req) {
    const wordsFile = await fs.readFile(process.cwd() + '/5-letter-words.json', 'utf8');
    const words = JSON.parse(wordsFile)
    const randomFiveLetterWord = getRandomWord(words);
    return NextResponse.json({ word: randomFiveLetterWord});
}
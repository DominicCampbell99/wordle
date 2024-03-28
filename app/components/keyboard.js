'use client';

import { Stack } from "@mui/material";
import KeyButton from "./keybutton";

const keyboardRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keyboardRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyboardRow3 = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'];

/**
 * A displayed keyboard layout made up by an assortment of key buttons
 * @param {Props} props 
 */
export default function Keyboard({handleKeyPress, guesses}) {
  return (
    <Stack spacing={1}>
        <Stack direction={'row'} spacing={0.5}>
            {keyboardRow1.map((key, index) => (
                <KeyButton 
                    key={index}
                    keyletter={key} 
                    guesses={guesses}
                    handleKeyPress={handleKeyPress}
                />
            ))}
        </Stack>
        <Stack direction={'row'} spacing={0.5} paddingLeft={3}>
            {keyboardRow2.map((key, index) => (
                <KeyButton 
                key={index}
                keyletter={key} 
                guesses={guesses}
                handleKeyPress={handleKeyPress}
                />
            ))}
        </Stack>
        <Stack direction={'row'} spacing={0.5}>
            {keyboardRow3.map((key, index) => (
                <KeyButton
                key={index}
                keyletter={key} 
                guesses={guesses}
                handleKeyPress={handleKeyPress}/>
            ))}
        </Stack>
    </Stack>
  );
}

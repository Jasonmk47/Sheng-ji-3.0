#!/bin/bash
INDEX=0
for picture in /c/dev/Sheng-ji-3.0/client/public/cards/*; do
    echo "$INDEX: '$picture',"
    ((INDEX++))
done
#!/usr/bin/env bash
if [ "$ENV" = "DEV" ]
then
    echo "Development Mode"
elif [ "$ENV" = "PROD" ]
then
    echo "Production Mode"
else
    echo "ENV : has not been set yet..."
fi
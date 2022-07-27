
# PortF Coding Challenge

## fUNCIONALITIES:
  
  
  -Two pikers to get a range of dates, they are limitited between the earliest first brewed and the last to prevent unvalid values. 
  
  -A list of ABV to filter by this parameter. The list is binding to values at the range dates provided.
  
  -A button to reset the filters.



## Task

Use the PunkApi (https://punkapi.com/documentation/v2) to fetch all of the beers that they have in their API (~324 at time of writing). Then, using Nivo (https://nivo.rocks/) plot, using a bar graph, the sum of beers first brewed for each month. 

Finally, create a filter that allows the user to filter the bar graph by date, and by the beer percentage (ABV).

We aren't too fussed about styling for this exercise, but it would be ideal to get the structure of the page to be similar to the wireframe below:

<img width="1195" alt="Screenshot 2022-07-18 at 15 54 12" src="https://user-images.githubusercontent.com/3050562/179539492-6d5d01b9-3cd7-4807-866f-0b5efb5222d7.png">

## Considerations

- Consider how this may be expanded in the future, and which components may be re-usable as the application grows.
- We prefer to utilise functional React with Hooks, over class-based React, however, this is not a dealbreaker.
- You do not need to build a date-picker yourself, there are many open source ones available!
- Don't just commit all your work in one go, do lots of small commits!

## Assumptions

- If the beer does not contain a first brewed month and only a year is available, assume Janaury of that year.

## Submission

Fork this and commit your work into any public repo (Github, Gitlab, Bitbucket etc.)

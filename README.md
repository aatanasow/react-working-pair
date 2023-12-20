# Project Title <!-- omit in toc -->

Working Pair

## Table of Content: <!-- omit in toc -->

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

Pair of employees who have worked together: application that identifies the pair of employees who have worked together on common projects for the longest period of time and the time for each of those projects.

## Technologies

I used `html`, `css`, `react`

## Setup

- download or clone the repository
- run `npm install`
- run `npm start`

## Approach

This application loads external CSV file (comma separated), parse the data to matrix, check for invalid input(s), sort the data by project, find all the pairs of employees worked on the same time and finally find the pair working for the longest period of time. The result is displayed in table.

The CSV file with data in the following format:
EmpID, ProjectID, DateFrom, DateTo

> NOTE: I assume that DateTo is the last working day for the period

It accept the following date formats:

> ISO Date -> "2015-03-25" (The International Standard)
>
> Short Date -> "03/25/2015"
>
> Long Date -> "Mar 25 2015" or "25 Mar 2015"

## Status

Working Pair is still in progress.

## Credits

List of contributors:

- [Alex Atanasov](aatanasow.com)

## License

MIT license @ [Alex Atanasov](aatanasow.com)

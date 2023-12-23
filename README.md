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

The application works in the following sequence:

1. loads external CSV file (comma separated)
2. parse the data to matrix
3. check for invalid input(s)
4. sort the data by project
5. find all the pairs of employees worked on the same time
6. find the pair working for the longest period of time
7. result is displayed in two tables - Summary and Breakdown.

The CSV file load data in the following format:
EmpID, ProjectID, DateFrom, DateTo

> Testing files are placed inside /src/data/ folder

It accept the following date formats:

1. ISO Date -> "2015-03-25" (The International Standard)
2. Short Date -> "03/25/2015"
3. Long Date -> "Mar 25 2015" or "25 Mar 2015"

The valid data should meet the following criteria:

1. There should be no missing field(s)
2. All DateFrom fields should be valid date
3. All DateTo fields should be valid date or NULL
4. There should be no date in the future
5. All periods should be valid - start date is before end date
6. There shouldn't be no 2 or more overlapping periods for one and the same combination "employee" && "task". In this case they will be merged.

## Status

Working Pair is still in progress.

## Credits

List of contributors:

- [Alex Atanasov](aatanasow.com)

## License

MIT license @ [Alex Atanasov](aatanasow.com)

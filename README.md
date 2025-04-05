# Web Development Project 5 - *Dungeons and Dragons Spells*

Submitted by: **Amanda Stone**

This web app: **allows users to view all D&D 5e spells and search, sort, or filter through them.**

Time spent: **7.5** hours spent in total

## API Used

[Open5e](https://open5e.com/) - A Dungeons & Dragons Fifth Edition Open Source API

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data:
    - Total number of spells
    - Total spells that require material components
    - Total spells that requires concentration
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Implemented Material UI design elements for better UI
      
## Video Walkthrough

Search Feature
![search_feature](https://github.com/user-attachments/assets/2fd4bee8-93b1-4764-8411-5d4e96ca46f6)

Filter by School
![filter_by_school](https://github.com/user-attachments/assets/f82c1c9e-4d96-4de6-9d95-bc195c70aecc)

Filter by Spell Level - Dropdown Menu
![filter_by_spell_level_dropdown](https://github.com/user-attachments/assets/ff5fc0fe-eb07-4fb5-a39f-a9b0aed7d579)

Filter by Spell Level - Slider with Range Option
![filter_by_spell_level_slider](https://github.com/user-attachments/assets/b4ef30f9-e551-4789-b6a5-e9dfdc151990)

Filter by Spell Level - Input with Range Option
![filter_by_spell_level_input](https://github.com/user-attachments/assets/1fdc6412-3cac-4813-beb7-6b1f9d8eb9e8)

Filter by Multiple Filters
![filter_multiple_filters](https://github.com/user-attachments/assets/a96df6b0-56dc-46b0-ac95-da57008fb3b5)

GIFs created with [Kap](https://getkap.co/) for macOS

## Notes

Working with the API- it's a free, open source so the documentation is incorrect or off sometimes. But still very helpful!

## License

    Copyright 2025 Amanda Stone

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

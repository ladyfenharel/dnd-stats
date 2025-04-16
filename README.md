# Web Development Project 6 - *D&D Spells*

Submitted by: **Amanda Stone**

This web app: **allows users to browse, search, and filter spells from Dungeons & Dragons Fifth Edition.**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

- [x] Implemented a "Back to Spell List" button on the detail view for easy return navigation
- [x] Integrated clear loading indicators during data fetching and informative error messages when issues occur
- [x] Implemented pagination controls to allow users to navigate through the extensive list of spells in manageable sections
- [x] Incorporated two distinct chart types (bar and pie) using Recharts to provide insightful visual representations of the spell data
- [x] Utilized useNavigate() for programmatic control over routing, enabling dynamic navigation within the application

## Video Walkthrough

Here's a walkthrough of implemented features:
![Spell_Details](https://github.com/user-attachments/assets/71d7bf61-b23a-4637-af0c-24f1fa09cc83)
![Responsive_Charts](https://github.com/user-attachments/assets/ade8280a-1b14-46f5-bb5f-1e33a088d33e)
![Dashboard](https://github.com/user-attachments/assets/43509734-29b4-4fc3-a1ae-c483f0f03cce)
![Charts](https://github.com/user-attachments/assets/1c6e2f9c-fe0e-4c1b-b906-e73299157f92)

GIFs created with [Kap](https://getkap.co/)

## Notes

I had to reorganize my project hierarchy completely to implement React Router. I also went through a few different libraries before liking the look of the charts.

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

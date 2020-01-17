# The charcter generation process

1. Pick the **Era of play**:
    - Enterprise
    - Original Series
    - The Next Generation

2. Choose or roll **Species**. Depends on era of play chosen. Species with no chance of roll are unavailable. Grants the following benefit:
    - a *trait* equals the species name
    - 3 *attributes* to raise by 1
    - 1 *talent* from the general pool or from the 2 species specific

    Special cases: 
    - Humans get to choose 3 *attribute* to increase

3. Choose or roll the **Environment**. Grants the following benefits:
    - a *value*
    - an *attibute* increase
    - a *discipline* increase

    Special cases:
    - *Homeworld* chooses from the species attributes
    - *Another species' world* gets to choose or roll the another species and choose from its attribute list

4. Choose or roll the **Upbringing**. Grants the following benefits:
    - 2 choices of *attribute* sets: Accepted or Rebelled
    - +1 to a *discipline*, choosen from a list
    - a *focus*
    - a *talent*

    Special cases:
    - "Starfleet" gets to choose from any discipline

5. Choose or roll the **Starfleet Academy** path. Grants the following benefits:
    - a *value*
    - +3 point of *attributes*, maximum +2 increase per attribute, any attribute
    - a major *discipline* (+2) and 2 minor *disciplines* (+1). No discipline can be higher than 4
    - 3 *focuses*
    - a *talent*

6. Choose the **Career**. Grants the following benefits:
    - a *value*
    - a *talent*

7. Choose or roll two **Career Event**. Grants the following benefits:
    - an *attribute* increase
    - a *discipline* increase
    - one *focus*

    Special cases:
    - some events allows choosing any discipline or attribute

8. Finishing touches:
    - add a *value*
    - Attribute reallocation:
        - Young officer cannot have any *attribute* larger than 11
        - Experienced and Veteran officers can have a single *attribute* at 12, the rest should be maximum 11
        - points can be moved on a 1-1 basis
    - Discipline reallocation:
        - Young officer cannot have any *discipline* larger than 4
        - Experienced and Veteran officers can have a single *discipline* at 5, the rest should be maximum 4
        - points can be moved on a 1-1 basis
    - Calculated values:
        - Stress = Fitness + Security
        - Damage Bonus = Security


# Implementation

## Login screen
Standard login screen with the basic controls:
- log in with google, facebook, etc.
- register
- forgot password

### components:
- error message
- button
- textarea
- command link ?


## List of characters (Home)
Some sort of list (table or panels) of charaters with hovering action items.
Details provided:
- Name
- Era of play
- Species
- Starfleet academy path

The actions are:
- add new (list level action)
- view details
- edit
- delete

### components:
- list or panel per character. Ideally both
- action buttons per character: view, edit, delete
- action button on the list: add new

### navigation
- character editor (per character)
- character viewer (per character)
- logout


## character viewer
Tries to look like the actual character sheet and statically displays everything done so far

### components:
- labels
- losts of layout and formatting

### Navigation
- home

## character editor
The generation process is represented by tabs. The tabs change status as the process moves along
The individual tabs will host mostly form controls.
Tabs:
1. basic info, with:
    - name
    - era of play
2. Species (enabled after era of play selected)
    - choose or roll species
    - (humans) selecting 3 attribute out of 6
    - choose a talent from the species or general list
3. Environment (enabled after Species selected)
    - pick an attribute
    - pick a discipline
    - write a talent
4. Upbringing
    - pick accepted/rejected
    - pick a discipline
    - write a focus
    - write a talent
5. Academy
6. Career
7. Career events

### Navigation
- home (exit without saving)
- save


# global components

| component                     | material ui | MS fabric | Semantic UI |
|-------------------------------|-------------|-----------|-------------|
| wizard/tab/accordion          | https://material-ui.com/components/steppers/ | https://developer.microsoft.com/en-us/fabric#/controls/web/pivot | https://react.semantic-ui.com/modules/tab/ |
| number plus/minus and input   | https://material-ui.com/components/slider/ | https://developer.microsoft.com/en-us/fabric#/controls/web/spinbutton | https://react.semantic-ui.com/elements/input/ |

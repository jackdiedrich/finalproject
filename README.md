# Final Project

## Introduction

This is a final project for the [Interacting with Data](https://github.com/Brown-BIOL2430-S04-Fall2015/syllabus) seminar in fall 2015. This project provides an .js file and a .html that writes out the group or category labels provided by the dataset, the samples unique to those groups, and two bivariate plots of whatever attributes or variables describe those samples, as provided by the dataset. "visualization.js" can read through a categorical dataset provided 1) it is in .csv format, 2) it meets the stipulations listed at the top of "visualization.js" and 3) its rows are samples and its columns are variables or attributes describing those samples.

This project was initially intended to be a visualization of a phylogeny and plots that corresponded to attributes of the various taxa on the tip labels. However, the dataset is unpublished, requiring a more flexible coding of the visualization. Consequently, this .js file should be able to read through most datasets as long as they are simple enough.

This simple editing means that this could be a quick and easy tool for exploring a fairly high-dimensional dataset with many groups/categories, albeit probably only at a first pass in elucidating general relationships between variables, and the data within the context of the dataset. However, it may be able to serve as a good roadmap in the early stages of analysis within a project, due to the fact that it allows quick, but continous views between many different variables.

To try out your own .csv on this visualization, clone this repository, move your .csv file into the repository, and make the necessary adjustments to the first several lines of "visualization.js" to customize it to your dataset.

To view this with the dataset "iris.csv" [click here](https://rawgit.com/jackdiedrich/finalproject/master/index.html).

## The data

- The data source for this project is unpublished, and therefore the true names for the data have been substituded by fake names and values have been replaced by randomly generated numbers that fall within the range of true values. 
- The data represented here are morphometric variables. Some are linear morphological measurements, some are area, and some are mass. In addition to these continuous variables, there are several characterizations that are discrete.

## Background

To be updated:

Since this data is currently unpublished, I am unable to provide links and images to previously existing graphics. However, in this dataset we are dealing with 178 points that fit into 9 groups. Consequently, the use of color to distinguish groups isn't very effective with so many different colors. In addition, while the reader may be able to distinguish groups based on color, many of the points represent specific species of interest that have been extensively studied, and the viewer may want to find a specific species on the plot. Therefore, an interactive approach would allow the viewer to highlight objects of interest, and allowing the viewer to interact with the phylogeny would allow them to gain some context for the distribution at different areas in the tree. 

## This project

### Mapping of data to aesthetics

To be updated:

Data are mapped to x, y coordinates on bivariate plots. The data will also be binned by color, representing genus. I chose to not use any varieties in size, which would be plotting a third dimension, as I think a simplistic, 2-dimensions at-a-time approach is more effective to situate the viewer with the data. 

As the data continues collected, different shapes (2 different shapes) may be introduced to elucidate which values are from real biological specimens, and which values we produced in our empirical test.

### Filtering

To be updated:

With multiple plots, all the data will be exposed to the viewer from the get-go. The viewer is then free to explore the data by interacting with it. Therefore, as of now, there will not be any data that the viewer cannot see upon opening the page.

### Extra ink

To be updated:

The only redundancy currently present is perhaps the repetitve "Species" labels (e.g. Species 1, Species 2, etc.). These will eventually be replaced by binomials (e.g. Acer saccharum). Once these are present, the "Genus" labels may be redundant, but serve to bin the species into their specific genera, and therefore, I think the redundancy makes sense. Otherwise the species would be represented just by species name (e.g. saccharum), which requires the viewer to read the species name and then reference it to the genus it is binned in.

### Motion

To be updated:

Future edits may allow the viewer to select the axes to allow for multiple bivariate comparisons. In this case, the points would move as the axes adjust. However, due to the nature of the data, this may not be an effective strategy, and separate plots will appear on the same page.

Currently there is some "motion"; when the viewer mouses over a species, the point becomes darker, and this motion is used to attract the viewer to the point on the plot. I found that this strategy worked better than making all points more transparent and slightly darkening the selected point, since it created a "glitchy" effect each time the viewer moused on and out from a species.

### Perspective

To be updated:

The user initially sees all data, and from there, can mouse over specific taxa in order to elucidate their space on the plot. Therefore, the user to some extent controls data filtering.

## Assessment

To be updated at the project end:

- Was the new visualization successful at providing insight that was not possible or more difficult with previous approaches?

- What are the main limitations of new approach?

- What are future directions this could go in?



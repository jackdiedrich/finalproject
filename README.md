# Final Project

## Introduction

This is a final project for the [Interacting with Data](https://github.com/Brown-BIOL2430-S04-Fall2015/syllabus) seminar in fall 2015. This project provides an .js file and a .html that writes out the group or category labels provided by the dataset, the samples unique to those groups, and two bivariate plots of whatever attributes or variables describe those samples, as provided by the dataset. "visualization.js" can read through a categorical dataset provided 1) it is in .csv format, 2) it meets the stipulations listed at the top of "visualization.js" and 3) its rows are samples and its columns are variables or attributes describing those samples.

This project was initially intended to be a visualization of a phylogeny and plots that corresponded to attributes of the various taxa on the tip labels. However, the dataset is unpublished, requiring a more flexible coding of the visualization. Consequently, this .js file should be able to read through most datasets as long as they are simple enough.

To try out your own .csv on this visualization, clone this repository, move your .csv file into the repository, and make the necessary adjustments to the first several lines of "visualization.js" to customize it to your dataset.

This simple editing means that this could be a quick and easy tool for exploring a fairly high-dimensional dataset with many groups/categories, albeit probably only at a first pass in elucidating general relationships between variables, and the data within the context of the dataset. However, it may be able to serve as a good roadmap in the early stages of analysis within a project, due to the fact that it allows quick, but continous views between many different variables.

To view this with the dataset "iris.csv" [click here](https://rawgit.com/jackdiedrich/finalproject/master/index.html).

## The data

- The data source for this project is unpublished, and therefore the dataset has been supplemented by the iris flower dataset. These match the unpublished data in the fact that they both describe morphological attributes, but they also both contain categories in which the samples can be binned, leading them both to fit into the structure of the visualization.

## Background

Since the original dataset is currently unpublished, I am unable to provide links and images to previously existing graphics. However, previous versions include plots with a phylogeny by side. However, except for colors that quickly become indistinguishable due to the 10 categories our dataset is binned into, there is no intuitive way that the viewer can link the plots to the evolutionary tree. Therefore, this project not only provides a way to link the plotted variables to their context within the dataset (the phylogeny), but allows the viewer to explore the data, quickly transitioning between different attributes in order to elucidate relationships.

## This project

### Mapping of data to aesthetics

Data are mapped to x, y coordinates on bivariate plots. The data categories are also binned by color. Additionally, data categories, names, and variables are mapped to text.


### Filtering

Initially, the viewer sees the entire dataset, according to its names and categories (if the dataset is small enough, otherwise they can scroll down), and the viewer sees two plots with four different variables plotted. The viewer can then hover over a data category or an individual sample, and the points on the plot will be enlarged in order to elucidate their context within the plot. Similarly, the viewer can hover a point, upon which a tooltip will appear with the name of the datapoint, and its name in the left-side viewer will be enlarged, in order to elucidate its context within the dataset. 

The viewer can then shift between which variables they would like to see plotted, by scrolling and clicking along the x and y-axis of each plot. This allows the perspective to be largely unconstrained.

### Extra ink

The fact that data names and categories are plotted to text may be considered extra ink. However, when viewing a dataset with a large number of categories, using color to distinguish categories quickly becomes unhelpful due to similar colors being repeated. Therefore, allowing the viewer to select points by hovering over a category name allows more effective elucidation. 

Additionally, the second plot may be considered extra ink. However, the plot does work to compare more than 2 variables at one point, hopefully allow the viewer to better explore the dataset and relationships between variables.

Lastly, there is quite a bit of extra ink in printing the many different variable names along each axis multiple times.

### Motion

Upon selecting a point or category, the points transition to becoming enlarged and slightly darker. This continuity allows the viewer to see where these points lie in the unhighlighted, normal plot. Without the transition, it might be hard for the viewer to understand which point is becoming enlarged.

The points also shift and transition when the axes are changed. This allows the viewer to maintain continuity between the multiple perspectives offered by the visualization.

### Perspective

The user initially views a constrained perspective, since they will only be looking at four separate variables on bivariate plots. From here though, the perspective is largely unconstrained, since this is meant to be more of a data exploration tool rather than a data exposition tool. The viewer views all names and all categories. The visualization allows the viewer to plot any variable, as long as it is contained within the data set and is numeric. 

## Assessment

To be updated at the project end:

- This visualization allows the viewer to "import" a dataset and quickly shift between plotting different variables as well as select the categories and points the viewer wishes to hone in on. Therefore, the dataset will hopefully provide insight to a user who is doing first-order analysis on a dataset, and will hopefully be a more effective tool than, for example, plotting in R and trying determine which variables are outlying. 

- The main limitations of this approach is the constrained type of dataset that a user could "import". Additionally, there may be "too much" information in shuffling between the two plots, the many options to select different axes. Therefore, it might actually be more simple to plot things in R in order to not be overwhelmed by so much information.

- Future versions of this project could allow the viewer to log-transform variables, hide samples or categories that they don't wish to see, and perhaps, if not exhaustive on the browser, run a linear regression between two variables.



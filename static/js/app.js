// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
let metedata = d3.select(".metedata").
console.log

    // Filter the metadata for the object with the desired sample umbenr
  
  let result = metadata.filter(meta => meta.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`); // Append key-value pairs as new <h6> elements
    });
  });
}
   

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
const samples = data.samples;
console.log(samples);

    // Filter the samples for the object with the desired sample number
    const filteredSample = samples.filter(s => s.id === sample)[0];
    console.log(filteredSample);

    // Get the otu_ids, otu_labels, and sample_values
const otu_ids = filteredSample.otu_ids;
const otu_labels = filteredSample.otu_labels;
const sample_values = filteredSample.sample_values;

    // Build a Bubble Chart
const TraceBubble = {
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: 'markers',
  marker: {
    size: sample_values,
    color: otu_ids,
    colorscale: 'Earth'
  },
};
const LayoutBubble = {
  title: 'Bacteria Cultures Per Sample',
  xaxis: { title: 'OTU ID' }, 
yaxis: { title: 'Sample Values' },
}

    // Render the Bubble Chart
Plotly.newplot('bubble', [TraceBubble], LayoutBubble);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
const yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barTrace = {
      x: sample_values.slice(0, 10).reverse(), 
      y: yticks.reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'

    };

    const barLayout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', [barTrace]);

  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
const names = data.names;
console.log(names);

    // Use d3 to select the dropdown with id of `#selDataset`
const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample) => {
      dropdown.append("option")
              .text(sample) // Set the text for the option
              .property("value", sample);
            });

    // Get the first sample from the list
  const firstSample = names[0];
  console.log(firstSample); 
    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
     
    

// Initialize the dashboard
init();

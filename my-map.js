require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/layers/FeatureLayer"], 

    // Setting up key esri features and basemap.
    function (esriConfig,Map,MapView, FeatureLayer) {
            esriConfig.apiKey = "AAPK9ebd4b11a370445481383e22f7632ef0l0yaqt8zxAnFvLRnBbesgmsh-odhUuSCxB4U8XKCxvgAo8y0CaAJfZBta_RyvNd3";
            const map = new Map({
            basemap: "arcgis-topographic" // Basemap layer
        });

    // Defining the viewport of the map.
    const view = new MapView({
      map: map,
      center: [-100.805, 40.027],
      zoom: 5, // scale: 72223.819286
      container: "viewDiv",
      constraints: {
        snapToZoom: false
      }
    });

    // Defining popup template.
    const popupPlant = {
      "title": "{name_of_powerplant}",
      "content": "<b>Plant Owner</b>: {owner_of_plant} <br> " +
      "<b>Capacity in Megawatts</b>: {capacity_in_MW} <br>" +
      "<b>Actual Plant Generation for 2020</b>: {estimated_generation_gwh_2020}GWh<br>" + 
      "<b>Tip</b>: GWh stands for GigaWatt hours in the billions."
    }

    // Defining the feature layer
    const layer = new FeatureLayer({
      url: "https://services6.arcgis.com/IhYDxsxeNLtTimgN/arcgis/rest/services/powerplants_global_global_power_plants/FeatureServer/0",        definitionExpression: "country = 'United States of America' AND primary_fuel = 'Wind'",
        outputFields: ["owner_of_plant", "generation_gwh_2020", "capacity_in_MW", "estimated_generation_gwh_2020"],
        popupTemplate: popupPlant,
        renderer: {
            type: "simple",
            symbol: {
              type: "simple-marker",
              size: 6,
              color: "teal",
              outline: {
                color: "white",
                width: 0.5
              }
            }
          }
    });

    map.add(layer);

    // Enabling groupings based on location when zoomed out
    layer.featureReduction = {
        type: "cluster",
        clusterMinSize: 16.5,
        labelingInfo: [
            {
              deconflictionStrategy: "none",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,###')"
              },
              symbol: {
                type: "text",
                color: "white",
                font: {
                  family: "Noto Sans",
                  size: "12px"
                }
              },
              labelPlacement: "center-center"
            }
          ]
      };
});

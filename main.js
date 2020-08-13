  
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appCs0nCiw7zzPwMB/Sneaker?api_key=keyHP1SoG8spdrIRQ",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields["Picture"];
          var sneaker = record.fields["Sneaker"];
          var cost = record.fields["Cost"];
          var date = record.fields["Released"];
          var material = record.fields["Materials"];
          var history = record.fields["History"];
          var landscape = record.fields["Landscape"];
          html.push(listView(id, picture, sneaker, cost, date, material, history));
        });
        $(".list-view").append(html);
      }
    );
  };
  
  var listView = function(id, picture, sneaker, cost) {
    return `
    <div class="card border-dark" style="width: 18rem;">
    ${picture ? `<img src="${picture[0].url}">` : ``}
    <div class="card-body">
    <h2 class="card-title"><a href="index.html?id=${id}">${sneaker}</h2></a>
    <p class="card-text"><u> Sneaker Price:</u><p> $${cost}</p>
    `;
  };
  
  var getOneRecord = function(id) {
    $.getJSON(

      `https://api.airtable.com/v0/appCs0nCiw7zzPwMB/Sneaker/${id}?api_key=keyHP1SoG8spdrIRQ`,
      function(record) {
        var html = [];
        var picture = record.fields["Picture"];
        var sneaker = record.fields["Sneaker"];
        var cost = record.fields["Cost"];
        var date = record.fields["Released"];
        var material = record.fields["Materials"];
        var history = record.fields["History"];
        var landscape = record.fields["Landscape"];

        html.push(
          detailView(
            picture,
            sneaker,
            cost,
            date,
            material,
            history,
            landscape

          )
        );
        $(".detail-view").append(html);
      }
    );
  };

  var detailView = function(
    picture,
    sneaker,
    cost,
    date,
    material,
    history,
    landscape,
  ) {
    return `
    
    <div class="info">
<div class="card-deck">
  <div class="card border-dark" style="width:600px; height: 100%;">
  ${landscape ? `<img src="${landscape[0].url}">` : ``}
      <div class="card-body">
        <h2 class="card-title">${sneaker}</h2> 
        <h5 class="card-title">Price</h2> 
        <p class="card-text">${cost}</p>
        <h5 class="card-title">Release Date</h2> 
        <p class="card-text">${date}</p>
        <h5 class="card-title">History</h2> 
        <p class="card-text">${history}</p>
        <h5 class="card-title">Material</h2> 
        <p class="card-text">${material}</p>

    `;
  };
  
  

var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Donutshop(location, hrMin, hrMax, inPercent, avgOrder, donutPrice) {
  this.location = location;
  this.inPercent = inPercent;
  this.avgOrder = avgOrder;
  this.donutPrice = donutPrice;
  this.hoursOfOperation = ["7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
  this.trafficPerHour = [];

  for (var i = 0; i < this.hoursOfOperation.length; i++) {
    this.trafficPerHour[i] = getRandomInt(hrMin, hrMax);
  }

  this.getFootTotal = function() {
    var footTotal = 0;

    for (var i = 0; i < this.hoursOfOperation.length; i++) {
      footTotal += this.trafficPerHour[i];
    }

    return footTotal;
  }

  this.getHourlyCustomers = function() {
    var customers = [];

    for (var i = 0; i < this.hoursOfOperation.length; i++) {
      customers[i] = Math.round(this.trafficPerHour[i] * (inPercent / 100));
    }

    return customers;
  }

  this.getTotalCustomers = function() {
    return Math.round(this.getFootTotal() * (inPercent / 100));
  }

  this.getHourlyDonuts = function() {
    var donuts = [];

    for (var i = 0; i < this.hoursOfOperation.length; i++) {
      donuts[i] = this.getHourlyCustomers()[i] * avgOrder;
    }

    return donuts;
  }

  this.getTotalDonuts = function() {
    return this.getTotalCustomers() * avgOrder;
  }

  this.getHourlyProfit = function() {
    var profit = [];

    for (var i = 0; i < this.hoursOfOperation.length; i++) {
      profit[i] = this.getHourlyDonuts()[i] * this.donutPrice;
    }

    return profit;
  }

  this.getTotalProfit = function() {
    return this.getTotalDonuts() * this.donutPrice;
  }

  this.hourlyReport = function() {
    $('td').remove();

    for (var i = 0; i < this.hoursOfOperation.length; i++) {

      var trEl = document.getElementById(this.hoursOfOperation[i]);

      var cell1 = document.createElement('td');
      cell1.textContent = this.trafficPerHour[i];
      trEl.appendChild(cell1);

      var cell2 = document.createElement('td');
      cell2.textContent = this.getHourlyCustomers()[i];
      trEl.appendChild(cell2);

      var cell3 = document.createElement('td');
      cell3.textContent = this.getHourlyDonuts()[i];
      trEl.appendChild(cell3);

      var cell4 = document.createElement('td');
      cell4.textContent = this.getHourlyProfit()[i];
      trEl.appendChild(cell4);

    }
  }


};

var downtown = new Donutshop("Downtown", 80, 220, 10, 4, 1.25),
    capitolHill = new Donutshop("Capitol Hill", 5, 45, 45, 2, 1.25),
    southLakeUnion = new Donutshop("South Lake Union", 180, 250, 5, 6, 1.25),
    wedgewood = new Donutshop("Wedgewood", 20, 60, 20, 1.5, 1.25),
    ballard = new Donutshop("Ballard", 25, 175, 33, 1, 1.25);



function totalReport(location) {

  $('#total').append('<td></td>');
  $('#total > td').text(location.getFootTotal());
  $('#total').append('<td></td>');
  $('#total td:nth-child(3)').text(location.getTotalCustomers());
  $('#total').append('<td></td>');
  $('#total td:nth-child(4)').text(location.getTotalDonuts());
  $('#total').append('<td></td>');
  $('#total td:nth-child(5)').text(location.getTotalProfit());

  // var methods = [getFootTotal,
  //               getTotalCustomers,
  //               getTotalDonuts,
  //               getTotalProfit];

  // for (var i = 0; i < methods.length; i++) {
  //   $('#total').append('<td></td>');
  //   $('#total td:nth-child(i + 1)').text(location.methods[i]());
  // }
}



function generateReport() {
  switch ($('#store').val()) {

    case "downtown":
      totalReport(downtown);
      downtown.hourlyReport();
      break;

    case "capitolHill":
      capitolHill.hourlyReport();
      totalReport(capitolHill);
      break;

    case "southLakeUnion":
      southLakeUnion.hourlyReport();
      totalReport(southLakeUnion);
      break;

    case "wedgewood":
      wedgewood.hourlyReport();
      totalReport(wedgewood);
      break;

    case "ballard":
      ballard.hourlyReport();
      totalReport(ballard);
      break;
  }
};

$('#store').on('change', generateReport);
$('#main').on('click', function(e){
  $(e.target).toggleClass('click');
});




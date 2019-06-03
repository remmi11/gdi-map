dict = {
    '#777777': '0 - Pending Prelim Plan',
    '#ff9600': '1 - Approved Prelim Plan',
    '#fd05ae': '2 - In-Review',
    '#1077bd': '3 - Filed',
    '#c52148': 'Other'
}

for (var key in dict) {
    //   console.log( key, dict[key] );
    // legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 0 ' + [(20 - 15) / 2] + 'px;background-color:' + key + ';"></span><p>' + dict[key] + '</p><br></div>');
    legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + 15 + 'px;height:' + 15 + 'px;margin: 10' + 'px;background-color:' + key + ';"></span><p>' + dict[key] + '</p><br></div>');
}
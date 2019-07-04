<?php

echo date('d'); // Number of the day
echo date('m'); // Number of the month
echo date('Y'); // Year
echo date('l'); // Day of the week or name of the day

echo date('Y/m/d');
echo date('m-d-y');

echo date('h'); // Hours
echo date('i'); // Minutes
echo date('s'); // Seconds
echo date('a'); // AM or PM

// Set Time Zone
date_default_timezone_set('Asia/Makassar');

echo date('h:i:s a');

/*
Unnix timestamp is a long integer containing the number of seconds between the Unix Epoch (January 1 1970 00:00:00 GMT) and the time specified
*/

$timestamp = mktime(10, 14, 54, 9, 10, 1981);

echo $timestamp;

echo date('m/d/Y h:i:sa', $timestamp);

$timestamp2 = strtotime('7:00pm March 22 2016');
$timestamp3 = strtotime('tomorrow');
$timestamp4 = strtotime('next Sunday');
$timestamp5 = strtotime('+2 Months');

echo $timestamp2;

echo date('m/d/Y h:i:sa', $timestamp3);


?>
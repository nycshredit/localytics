<?php
	
	header('Content-Type: application/json');
	
	$_SESSION['localytics_key'] = "a41aa16989eea0a42e467d4-41b21b40-0092-11e4-4762-00a426b17dd8";
	$_SESSION['localytics_secret'] = "e4d66fde9b8be875399e583-41b21f24-0092-11e4-4762-00a426b17dd8";
	$_SESSION['localytics_url'] = "https://api.localytics.com/profile/v1/profiles/";
	if ( $_GET["customerId"] ){
		$_SESSION['customer_id'] = $_GET["customerId"];
		$_SESSION['localytics_url'] = $_SESSION['localytics_url'] . $_SESSION['customer_id'];
	}

	$ch = curl_init($_SESSION['localytics_url']);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_USERPWD, $_SESSION['localytics_key'] . ":" . $_SESSION['localytics_secret']);
	$localytics_raw_json = curl_exec($ch);
	curl_close($ch);

	
	if ( $_GET["callback"] ){
		echo $_GET["callback"] . '(';
	}
	
			echo $localytics_raw_json;
	
	if ( $_GET["callback"] ){
		echo ');';
	}

?>
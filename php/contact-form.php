<?php

	require 'c_config.php';

	$c_name = $_POST['c_name'];
	$c_email = $_POST['c_email'];
	$c_subject = $_POST['c_subject'];
	$c_massage = $_POST['c_massage'];

	$e_content = "You have been contacted by ". $c_email . ". Their additional massage is as follow. <br><br>";

	$e_content .= $c_subject . "<br><br>";
	$e_content .= $c_massage . "<br><br>";
	$e_content .= "You can contact $c_email via email, $c_email";


	$headers = "From: " . $c_email . PHP_EOL;
	$headers .= "Reply-To: $c_email" . PHP_EOL;
	$headers .= "MIME-Version: 1.0" . PHP_EOL;
	$headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;



	$mail = mail(BEAUTYPRESS_EMAIL, BEAUTYPRESS_SUBJECT, $e_content, $headers);

	if ($mail) {
		echo BEAUTYPRESS_SUCCESS_MASSAGE;
	}

?>
<?php

/* Getting file name */
$filename = $_FILES['file']['name'];

/* Location */
$location = '../../upload/'.$filename;

/* Upload file */
$result = move_uploaded_file($_FILES['file']['tmp_name'],$location);

$arr = array("name"=>$filename);
echo json_encode($arr);
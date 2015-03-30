<?php
//NOTE: After generating the .json file, remove the last ',' after the last object in the array.
function getGps($exifCoord, $hemi) {

    $degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
    $minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
    $seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;

    $flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;

    return $flip * ($degrees + $minutes / 60 + $seconds / 3600);

}

function gps2Num($coordPart) {

    $parts = explode('/', $coordPart);

    if (count($parts) <= 0)
        return 0;

    if (count($parts) == 1)
        return $parts[0];

    return floatval($parts[0]) / floatval($parts[1]);
}

$dir = new DirectoryIterator(dirname('data'));
print "{\n \"type\" : \"geoTagged Textures\",\n\"features\":[";
foreach ($dir as $filename){
	if(!$filename->isDot()){
		//assumming all textures are jpg as of now, can add more supported formats.
		if(strpos($filename,'jpg') ===false){
			continue;
		}
//		$filename = "IMG_20141008_130951.jpg";
		$exif = exif_read_data($filename);
		$lon = getGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
		$lat = getGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);
		$direction = gps2Num($exif["GPSImgDirection"]);
		//var_dump($lat, $lon);
		print "\n\t\t{\n\t\t   \"filename\" : \"".$filename."\",\n";
		print "\t\t   \"position\" : [".$lon.",".$lat." ],\n";
		print "\t\t   \"direction\" : ".$direction."\n\t\t},\n";
//		print $lat.','.$lon.',';
//		print $dir;
//		print $filename."\n";
	}
}
print "\t]\n}\n";
?>

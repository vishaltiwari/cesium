<?php
//Pass in GPS.GPSLatitude or GPS.GPSLongitude or something in that format
function getGps($exifCoord)
{
  $degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
  $minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
  $seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;

  //normalize
  $minutes += 60 * ($degrees - floor($degrees));
  $degrees = floor($degrees);

  $seconds += 60 * ($minutes - floor($minutes));
  $minutes = floor($minutes);

  //extra normalization, probably not necessary unless you get weird data
  if($seconds >= 60)
  {
    $minutes += floor($seconds/60.0);
    $seconds -= 60*floor($seconds/60.0);
  }

  if($minutes >= 60)
  {
    $degrees += floor($minutes/60.0);
    $minutes -= 60*floor($minutes/60.0);
  }

  return array('degrees' => $degrees, 'minutes' => $minutes, 'seconds' => $seconds);
}

function gps2Num($coordPart)
{
  $parts = explode('/', $coordPart);

  if(count($parts) <= 0)// jic
    return 0;
  if(count($parts) == 1)
    return $parts[0];

  return floatval($parts[0]) / floatval($parts[1]);
}

$dir = new DirectoryIterator(dirname('data'));
foreach ($dir as $filename){
	if(!$filename->isDot()){
		print $filename;
		print '\n';
//		$filename = "IMG_20141008_130951.jpg";
		$exif = exif_read_data($filename);
//		var_dump($exif);
		$lon = getGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
		$lat = getGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);
		var_dump($lat, $lon);
	}
}

?>

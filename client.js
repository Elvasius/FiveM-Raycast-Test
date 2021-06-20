const RotationToDirection = (rotation) => {
	const adjustedRotation = 
	{ 
		'x': (Math.PI / 180) * rotation.x, 
		'y': (Math.PI / 180) * rotation.y, 
	  'z': (Math.PI / 180) * rotation.z 
	}
  
	const direction = 
	{
		'x': -Math.sin(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)), 
		'y': Math.cos(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)), 
		'z': Math.sin(adjustedRotation.x)
	}
	return direction
}
const RayCastGamePlayCamera = (distance) => {
	const [rotX, rotY, rotZ] = GetGameplayCamRot()
	const [camX, camY, camZ] = GetGameplayCamCoord()
	const direction = RotationToDirection({'x': rotX, 'y': rotY, 'z': rotZ})
 
	const destination = 
	{ 
		'x': camX + direction.x * distance, 
		'y': camY + direction.y * distance, 
		'z': camZ + direction.z * distance 
	}
	const [retval, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(StartShapeTestRay(camX, camY, camZ, destination.x, destination.y, destination.z, -1, -1, 1))
	
  return [hit, endCoords];
}
RegisterCommand(
  "raycastTest",
  async (_source) => {
    RayCastGamePlayCamera(1000)
    
   /*    SendDuiMouseMove(mainDui, browserX, browserY)
      SendDuiMouseDown(mainDui, 'left') */
  }, false
);

exports('RaycastCam', (arg) => {
    return RayCastGamePlayCamera(arg)
  });
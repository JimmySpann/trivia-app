import React, {useEffect, useRef} from 'react';
import './count-down.css';

function CountDownComponent ({startValue, handleFinished, size = 1, start = true, pause = false, color = "#FF4081"}) {  
	
	
	let arc, dot,
		angleInRadians,
		animatedCircle = function(deg) {
				var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
						angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
						return {
							'x': centerX + (radius * Math.cos(angleInRadians)),
							'y': centerY + (radius * Math.sin(angleInRadians))
						};
					},
					describeArc = function(x, y, radius, startAngle, endAngle, onlyM) {
						if (typeof onlyM === 'undefined') {
							onlyM = false
						}
						var start = polarToCartesian(x, y, radius, endAngle),
							end = polarToCartesian(x, y, radius, startAngle),
							arcSweep = endAngle - startAngle <= 180 ? "0" : "1",
							d = [
								"M", start.x, start.y,
								"A", radius, radius, 0, arcSweep, 0, end.x, end.y
							].join(" ");
						if (!onlyM)
							return d;
							else
							return {
								'x': start.x,
								'y': start.y
							}
					};

				//Keeps arc filled in
				if (deg > 359){
					deg = 359.9;
				}
					
				//I'm not proud of this try-catch, but it makes it work
				try{
					arc.setAttribute('d', describeArc(100, 100, 100, 0, deg));
					dot.setAttribute('cx', describeArc(100, 100, 100, 0, deg, true).x);
					dot.setAttribute('cy', describeArc(100, 100, 100, 0, deg, true).y);
				}
				catch {}
			},
		desensS,
		unitsS,
		// fullMinutes,
		carriedSeconds,
		step,
		arcCarrier = 0,
		timeDivider = 1,
		timeout = useRef();
		function setInputInTimer(value){
			// fullMinutes = value / 60;
			carriedSeconds = value //% 60;
			try{
				unitsS.innerHTML = carriedSeconds % 10;
				desensS.innerHTML = Math.floor(carriedSeconds / 10);
				// unitsM.innerHTML = Math.floor(fullMinutes) % 10;
				// desensM.innerHTML = Math.floor(Math.floor(fullMinutes) / 10);
				}
				catch{}
			}
		function timerStart(){
			timeout.current = setTimeout(function(){
				if(timeDivider % 100 === 0){
					if(startValue > 0){
						startValue--;
						timeDivider++;
						setInputInTimer(startValue);
						timerStart();
					}
				}
				else {
					timeDivider++;
					arcCarrier = arcCarrier + step; 
					animatedCircle(arcCarrier);
					timerStart();
				}

				if(arcCarrier > 359.9) {
					handleFinished();	
				}
			}, 10);
		}
		
		//Handles starting and stopping timer
		useEffect(() => {
			if (!pause && start) {
				setInputInTimer(startValue);
				// eslint-disable-next-line react-hooks/exhaustive-deps
				step = (360 / startValue) / 100; //It's okay. It works.
				timerStart();
			} else if (pause) {
				clearTimeout(timeout.current)
			}
			return () => clearTimeout(timeout.current)
		});
	
    return (
		<div className="timer-holder">
           <link href='https://fonts.googleapis.com/css?family=Nixie+One' rel='stylesheet' type='text/css' />	
            <div className="canvas">
				<svg id="animated_circle" width={100 * size} 
					 height={100 * size} xmlns="http://www.w3.org/2000/svg" 
					 viewBox="0 0 100 100" version="1.1"
					>
						<path fill="none" stroke="#ffffff" strokeWidth="4" 
						      d="M 99.82546716341017 0.0001523086712325039 A 100 100 0 1 0 100 0"	  
							  ></path>
						<path id="anim_arc" fill="none" 
						      stroke={color} strokeWidth="5" 
							  ref={el => {arc = el}}
							  />
						<circle id="dot_follows_arc" fill={color} r="6" 
						        cx="98.3" cy="0.015"
						        ref={el => {dot = el}}
								></circle>
						{/* <text fill="white" x="20" y="120" 
						  className="time desensM">
						  0
					  </text>
					  <text fill="white" x="59" y="120" 
						  className="time unitsM">
						  0
					  </text> */}
					  <text fill="white" x="15" y="150" 
						  className="time desensS"
						  ref={el => {desensS = el}}
						  >
						  0
					  </text>
					  <text fill="white" x="100" y="150" 
						  className="time unitsS"
						  ref={el => {unitsS = el}}
						  >
						  0
					  </text>
				</svg>
	        </div>
        </div>
    );
}



export default  CountDownComponent;
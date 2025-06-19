import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from "@mui/material";
import React, { useEffect, useState } from "react";

function getTimeUntilThursdayMidnight() {
  const now = new Date();
  const day = now.getDay(); // 일:0 ~ 토:6
  const daysUntilThursday = (4 - day + 7) % 7 || 7;

  const nextThursday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilThursday,
    0, 0, 0, 0
  );

  const diffMs = nextThursday - now;
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);

  return `${hours}시간 ${minutes}분 남음`;
}



export default function Header() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilThursdayMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilThursdayMidnight());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            소웨과 메남들의 랭킹 System
          </Typography>
          <Typography variant="body2" color="white">
            메요일(초기화)까지 남은시간: 
            <span
              style={{
                color: "yellow",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {timeLeft}
            </span>
          </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

// Announce.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import NoticeCard from "./NoticeCard";


const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const API_KEY =
  "test_92dab22cf4710df25f78160a1c7d550dd6cbdcd5583eebba334617fd655178bcefe8d04e6d233bd35cf2fabdeb93fb0d";

let isFetching = false;

async function getAnnounceInfo() {
  if (isFetching) return [];
  isFetching = true;

  const headers = {
    accept: "application/json",
    "x-nxopen-api-key": API_KEY,
  };

  try {
    await delay(500);
    const response = await axios.get(
      "https://open.api.nexon.com/maplestory/v1/notice",
      { headers }
    );
    return response.data.notice || [];
  } catch (err) {
    console.error("공지사항 조sd회 실패:", err);
    return [];
  } finally {
    isFetching = false;
  }
}


export default function Announce() {
  const [noticeData, setNoticeData] = useState(null); 

  useEffect(() => {
    (async () => {
      const list = await getAnnounceInfo();
      console.log("공지사항sdf 데이터:", list);
      setNoticeData(list);
    })();
  }, []);

  useEffect(() => {
    console.log("noticeData changed:", noticeData);
  }, [noticeData]);

  if (noticeData === null) {
    return (
      <Box sx={{ p: 2, m: 2 }}>
        <Typography align="center">공지사항을 불러오는 중...</Typography>
      </Box>
    );
  }

  if (noticeData.length === 0) {
    return (
      <Box sx={{ p: 2, m: 2 }}>
        <Typography align="center">표시할 공지사항이 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ m: 2, overflowY: "auto" }}>
      {noticeData.map((item) => (
        <NoticeCard
          key={item.notice_id || item.id}
          title={item.title}
          contentUrl={item.url}
        />
      ))}
    </Box>
  );
}

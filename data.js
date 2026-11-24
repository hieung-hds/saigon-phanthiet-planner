// Dữ liệu du lịch SÀI GÒN - PHAN THIẾT - MŨI NÉ (Đồng bộ chuẩn 100% từ Google Sheet)
window.DEFAULT_TRIP_DATA = {
  tripInfo: {
    title: "Chuyến Đi SÀI GÒN - PHAN THIẾT - MŨI NÉ (Mừng Sinh Nhật Bún 🎂)",
    startDate: "2026-11-27",
    endDate: "2026-11-30",
    departure: "Team Vinh (08:35) & Team Hà Nội (09:40) ➔ Sài Gòn",
    destination: "Phan Thiết - Mũi Né & TP. Hồ Chí Minh",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1lX2CfBN75L7zk59NdUNV4eL-AZqwxMYV78sW0fLxNSI/edit?gid=1491333133",
    travelers: [
      { id: 1, name: "Hiếu", team: "Hà Nội", role: "Team Hà Nội", flight: "Bay 09:40 (Nội Bài)" },
      { id: 2, name: "Diệu", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 3, name: "Ly", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 4, name: "Cường", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 5, name: "Linh", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 6, name: "Huy", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 7, name: "Huyền", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" },
      { id: 8, name: "Thương", team: "Vinh", role: "Team Vinh", flight: "Bay 08:35 (Vinh)" }
    ],
    transportation: "Máy bay (Vinh 08:35 & Hà Nội 09:40) + Xe Limousine 9 chỗ (8 thành viên)",
    notes: "Đoàn 8 thành viên: Team Vinh (7 bạn: Diệu, Ly, Cường, Linh, Huy, Huyền, Thương - Bay 08:35) và Team Hà Nội (Hiếu - Bay 09:40). 12h00 cả đoàn 8 người lên Limousine 9 chỗ tại 28 Mai Chí Thọ đi Mũi Né!"
  },

  // 4 Ngày chi tiết trích xuất chính xác từ Google Sheets
  itinerary: [
    {
      day: 1,
      date: "27/11/2026",
      dateTitle: "Ngày 1 (27/11): Bay Vào Sài Gòn ➔ Limousine Đến Mũi Né ➔ Một Nắng Seafood ➔ Sinh Nhật Bún 🎂",
      theme: "ocean",
      hotel: "Sunset Story Hotel (170/15 Nguyễn Minh Châu - View biển)",
      activities: [
        {
          id: "act-1-1",
          time: "07:00",
          title: "Di chuyển ra sân bay (Vinh & Nội Bài)",
          location: "Cảng HKQT Vinh (Team Vinh) & Cảng HKQT Nội Bài (Hiếu)",
          category: "transport",
          cost: 200000,
          done: false,
          notes: "Team Vinh (7 người: Diệu, Ly, Cường, Linh, Huy, Huyền, Thương) tập trung tại Sân bay Vinh. Hiếu di chuyển ra Sân bay Nội Bài (Hà Nội).",
          tip: "Chuẩn bị sẵn CCCD/hộ chiếu bản gốc và check-in online từ nhà để tiết kiệm thời gian."
        },
        {
          id: "act-1-2",
          time: "08:35",
          title: "Chuyến bay Team Vinh cất cánh (Vinh ➔ Sài Gòn)",
          location: "Cảng hàng không quốc tế Vinh",
          category: "transport",
          cost: 1400000,
          done: false,
          notes: "Chuyến bay của 7 thành viên Team Vinh cất cánh lúc 08:35. Thời gian bay khoảng 1h50, dự kiến hạ cánh SGN lúc 10:25.",
          tip: "Team Vinh gửi tin nhắn vào nhóm khi máy bay chuẩn bị cất cánh."
        },
        {
          id: "act-1-2b",
          time: "09:40",
          title: "Chuyến bay Team Hà Nội cất cánh (Hiếu: Hà Nội ➔ Sài Gòn)",
          location: "Cảng hàng không quốc tế Nội Bài (HAN)",
          category: "transport",
          cost: 1600000,
          done: false,
          notes: "Hiếu bay chuyến Hà Nội ➔ Sài Gòn cất cánh lúc 09:40, dự kiến hạ cánh Sân bay Tân Sơn Nhất lúc 11:45.",
          tip: "Bắt xe nhanh sang điểm hẹn ăn trưa và điểm đón xe Mai Chí Thọ."
        },
        {
          id: "act-1-3",
          time: "10:25",
          title: "Team Vinh hạ cánh Sân bay Tân Sơn Nhất (SGN)",
          location: "Cảng hàng không quốc tế Tân Sơn Nhất (SGN)",
          category: "transport",
          cost: 0,
          done: false,
          notes: "Team Vinh (7 người) hạ cánh Tân Sơn Nhất, lấy hành lý ký gửi và di chuyển sang khu vực ăn trưa gần điểm đón xe Mai Chí Thọ.",
          tip: "Đặt xe Grab 7 chỗ hoặc xe công nghệ đưa 7 người sang điểm hẹn."
        },
        {
          id: "act-1-4",
          time: "11:30",
          title: "Ăn trưa Sài Gòn (Team Vinh ăn nhanh, chờ Hiếu)",
          location: "Gần điểm hẹn / 28 Đường Mai Chí Thọ",
          category: "food",
          cost: 400000,
          done: false,
          notes: "Team Vinh ăn trưa nhanh, nạp năng lượng và chờ Hiếu hạ cánh chạy sang nhập đoàn đủ 8 người.",
          tip: "Món gợi ý: Cơm tấm Sài Gòn hoặc bún bò huế thơm ngon nhanh gọn."
        },
        {
          id: "act-1-5",
          time: "12:00",
          title: "Xe Limousine 9 chỗ đón đủ 8 người đi Mũi Né",
          location: "28 Đường Mai Chí Thọ, TP. Thủ Đức",
          category: "transport",
          cost: 1600000,
          done: false,
          notes: "Đầy đủ 8 thành viên (Hiếu + Diệu, Ly, Cường, Linh, Huy, Huyền, Thương) lên xe Limousine 9 chỗ chạy thẳng cao tốc Long Thành - Dầu Giây - Phan Thiết.",
          tip: "Chạy cao tốc chỉ khoảng 2h30 - 3h là tới Mũi Né. Ghế massage êm ái cho 8 người nghỉ ngơi."
        },
        {
          id: "act-1-6",
          time: "16:30",
          title: "Check-in Sunset Story Hotel (View Biển)",
          location: "170/15 Nguyễn Minh Châu, Mũi Né",
          category: "rest",
          cost: 1200000,
          done: false,
          notes: "Nhận phòng khách sạn view biển cực thơ mộng, cất hành lý, tắm rửa thay đồ chuẩn bị đi ăn tối.",
          tip: "Khách sạn view hoàng hôn biển rất đẹp, tranh thủ chụp vài tấm hình lúc chiều tà."
        },
        {
          id: "act-1-7",
          time: "18:00",
          title: "Ăn tối hải sản tại MỘT NẮNG Seafood",
          location: "122 Nguyễn Đình Chiểu, Khu phố 2, Hàm Tiến, Mũi Né",
          category: "food",
          cost: 1200000,
          done: false,
          notes: "Quán hải sản view biển nổi tiếng và lãng mạn. Thưởng thức mực một nắng nướng, tôm sú nướng muối ớt, sò điệp mỡ hành.",
          tip: "Đặt bàn sát mép biển để vừa nghe sóng vỗ vừa ăn tối dưới ánh đèn lung linh."
        },
        {
          id: "act-1-8",
          time: "20:00",
          title: "Về khách sạn - Tổ chức sinh nhật BÚN 🎂🎉",
          location: "Sunset Story Hotel",
          category: "nightlife",
          cost: 500000,
          done: false,
          notes: "Bí mật chuẩn bị bánh kem sinh nhật, nến, pháo bông và quà tặng chúc mừng tuổi mới của Bún!",
          tip: "Chuẩn bị playlist nhạc sinh nhật chill và vài lon bia / rượu vang chúc mừng."
        }
      ]
    },
    {
      day: 2,
      date: "28/11/2026",
      dateTitle: "Ngày 2 (28/11): Bình Minh Làng Chài ➔ Cafe SOHO ➔ Centara Mirage ➔ Jeep Bàu Trắng ➔ Muối Ớt Xanh",
      theme: "sand",
      hotel: "Centara Mirage Resort Mũi Né (Đường Huỳnh Thúc Kháng)",
      activities: [
        {
          id: "act-2-1",
          time: "05:00",
          title: "Ngắm bình minh Làng Chài Mũi Né",
          location: "Làng Chài Mũi Né, Đường Huỳnh Thúc Kháng",
          category: "sightseeing",
          cost: 50000,
          done: false,
          notes: "Đón những tia nắng đầu ngày rọi xuống hàng trăm chiếc thuyền thúng rực rỡ sắc màu bập bềnh trên mặt biển.",
          tip: "Không khí ban mai cực kỳ mát mẻ, chụp ảnh từ trên bờ kè bao trọn vịnh biển."
        },
        {
          id: "act-2-2",
          time: "07:30",
          title: "Ăn sáng đặc sản Phan Thiết",
          location: "Khu vực Mũi Né / Hàm Tiến",
          category: "food",
          cost: 160000,
          done: false,
          notes: "Bánh căn mắm kho hoặc bánh canh chả cá Phan Thiết nóng hổi thơm ngon.",
          tip: "Ăn xong về lại khách sạn nghỉ ngơi nhẹ trước khi đi cafe."
        },
        {
          id: "act-2-3",
          time: "09:00",
          title: "Cafe SOHO CF (hoặc Cafe Hừng Đông)",
          location: "SOHO CF (182 Huỳnh Thúc Kháng) hoặc Hừng Đông (72 Nguyễn Cơ Thạch)",
          category: "chill",
          cost: 200000,
          done: false,
          notes: "Quán cafe view biển lộng gió, decor tông trắng Địa Trung Hải siêu xinh để lên đồ chụp ảnh sống ảo.",
          tip: "Thử món cà phê muối hoặc trà trái cây nhiệt đới mát lạnh."
        },
        {
          id: "act-2-4",
          time: "11:00",
          title: "Ăn trưa: Tiệm Cơm Dưới Tán Dừa (hoặc The Lobster Mũi Né)",
          location: "120 Nguyễn Đình Chiểu, Hàm Tiến",
          category: "food",
          cost: 600000,
          done: false,
          notes: "Tiệm cơm dưới tán dừa ấm cúng phong cách gia đình, hoặc thưởng thức món ngon tại The Lobster Mũi Né ngay cạnh.",
          tip: "Các món cơm cá kho tộ, canh chua cá bớp, mực xào chua ngọt rất vừa vị."
        },
        {
          id: "act-2-5",
          time: "12:00",
          title: "Check-out Sunset Story Hotel",
          location: "170/15 Nguyễn Minh Châu",
          category: "rest",
          cost: 0,
          done: false,
          notes: "Thu dọn toàn bộ hành lý, làm thủ tục trả phòng Sunset Story.",
          tip: "Kiểm tra kỹ tủ đồ, sạc điện thoại trước khi rời phòng."
        },
        {
          id: "act-2-6",
          time: "12:30",
          title: "Di chuyển sang Centara Mirage Resort gửi đồ",
          location: "Centara Mirage Resort, Đường Huỳnh Thúc Kháng",
          category: "rest",
          cost: 3200000,
          done: false,
          notes: "Đến Centara Mirage Resort 5 sao đẳng cấp, gửi hành lý tại lễ tân và tham quan khuôn viên resort phong cách Địa Trung Hải.",
          tip: "Có thể chụp ảnh check-in khu tháp quan sát và hồ bơi vô cực phân tầng trước."
        },
        {
          id: "act-2-7",
          time: "14:00",
          title: "Book Tour Xe Jeep Bàu Trắng Sống Ảo",
          location: "Cung đường DT716 Xuân Thủy ➔ Đồi Cát Trắng ➔ KDL Bàu Trắng U&Me",
          category: "activity",
          cost: 800000,
          done: false,
          notes: "Tour Jeep xịn sò: Chạy trên cung đường ven biển đẹp nhất Việt Nam, chinh phục Đồi Cát Trắng sa mạc, check-in Khu DL Bàu Trắng U&Me.",
          tip: "Nhờ tài xế xe Jeep chụp ảnh tạo dáng bên sườn xe và trên đỉnh đồi cát!"
        },
        {
          id: "act-2-8",
          time: "18:30",
          title: "Về Centara Mirage Resort nhận phòng & tắm rửa",
          location: "Centara Mirage Resort Mũi Né",
          category: "rest",
          cost: 0,
          done: false,
          notes: "Nhận phòng resort, ngâm bồn nước nóng và xả sạch cát sa mạc, chuẩn bị xiêm y đi ăn tối.",
          tip: "Tận hưởng không gian phòng resort sang trọng và tiện nghi."
        },
        {
          id: "act-2-9",
          time: "19:30",
          title: "Ăn tối hải sản tại Nhà Hàng Muối Ớt Xanh",
          location: "173 Nguyễn Đình Chiểu, Hàm Tiến",
          category: "food",
          cost: 950000,
          done: false,
          notes: "Nhà hàng hải sản tươi sống nức tiếng: Tôm nướng muối ớt xanh, ốc hương sốt trứng muối, cua ghẹ hấp bia.",
          tip: "Nước chấm muối ớt xanh ở đây pha rất đậm đà đặc trưng."
        },
        {
          id: "act-2-10",
          time: "21:30",
          title: "Về Resort Centara Mirage nghỉ ngơi",
          location: "Centara Mirage Resort",
          category: "rest",
          cost: 0,
          done: false,
          notes: "Dạo quanh khuôn viên resort về đêm ngắm đèn lung linh hoặc thưởng thức ly cocktail tại bar resort.",
          tip: "Nghỉ ngơi sớm để sáng mai đón bình minh và tắm hồ bơi resort."
        }
      ]
    },
    {
      day: 3,
      date: "29/11/2026",
      dateTitle: "Ngày 3 (29/11): Chill Centara ➔ The Silk Road ➔ Cơm Nhà Tiểu Mạch ➔ Về Sài Gòn Food Tour",
      theme: "tropical",
      hotel: "Khách sạn trung tâm Sài Gòn",
      activities: [
        {
          id: "act-3-1",
          time: "07:00",
          title: "Ăn sáng buffet cao cấp tại Resort Centara",
          location: "Nhà hàng Mundo / Suan Bua, Centara Mirage",
          category: "food",
          cost: 0,
          done: false,
          notes: "Buffet sáng chuẩn 5 sao với hàng chục món Âu - Á - Việt, bánh ngọt nướng tươi thơm phức.",
          tip: "Chọn bàn ngoài trời nhìn thẳng ra vịnh biển để thưởng thức bữa sáng."
        },
        {
          id: "act-3-2",
          time: "08:00",
          title: "Chơi & vui chơi công viên nước tại Resort",
          location: "Hồ bơi vô cực & Công viên nước Centara",
          category: "activity",
          cost: 0,
          done: false,
          notes: "Tắm hồ bơi 3 tầng view biển, chơi cầu trượt nước hoặc chèo thuyền kayak trong khuôn viên resort.",
          tip: "Góc hồ bơi tràn bờ nhìn ra biển là điểm chụp ảnh đắt giá nhất."
        },
        {
          id: "act-3-3",
          time: "09:30",
          title: "Check-in Tổ hợp du lịch & Cafe The Silk Road Mũi Né",
          location: "73 Trần Khát Chân, Mũi Né",
          category: "chill",
          cost: 250000,
          done: false,
          notes: "Tổ hợp check-in nghệ thuật mang phong cách Con Đường Tơ Lụa kết hợp cafe sống ảo cực đỉnh.",
          tip: "Góc cầu thang xoắn ốc và ban công view toàn cảnh biển là điểm sống ảo nổi bật."
        },
        {
          id: "act-3-4",
          time: "11:00",
          title: "Ăn trưa tại Cơm Nhà Tiểu Mạch",
          location: "180/5 Nguyễn Đình Chiểu, Hàm Tiến",
          category: "food",
          cost: 450000,
          done: false,
          notes: "Quán cơm niêu gia đình mộc mạc đậm chất miền Trung: Thịt luộc cà pháo, cá kho tộ, canh cua rau mồng tơi.",
          tip: "Không gian sân vườn thoáng mát, đồ ăn nêm nếm rất chuẩn vị mẹ nấu."
        },
        {
          id: "act-3-5",
          time: "12:00",
          title: "Check-out, Xe Limousine đón về Sài Gòn",
          location: "Centara Mirage Resort Mũi Né",
          category: "transport",
          cost: 1600000,
          done: false,
          notes: "Xe Limousine 9 chỗ đón đoàn tận resort đưa thẳng về lại TP. Hồ Chí Minh.",
          tip: "Chạy cao tốc chỉ mất khoảng 2h30 - 3h là về tới trung tâm Sài Gòn."
        },
        {
          id: "act-3-6",
          time: "16:30",
          title: "Đến Sài Gòn - Check-in khách sạn & nghỉ ngơi",
          location: "Khách sạn trung tâm Quận 1 / Bình Thạnh",
          category: "rest",
          cost: 900000,
          done: false,
          notes: "Nhận phòng khách sạn tại Sài Gòn, cất hành lý, tắm rửa nghỉ ngơi lấy sức cho buổi tối.",
          tip: "Nghỉ ngơi 1 tiếng trước khi bắt đầu hành trình oanh tạc ẩm thực Sài Gòn."
        },
        {
          id: "act-3-7",
          time: "18:00",
          title: "FOOD TOUR SÀI GÒN VỀ ĐÊM 🍢🍜🍧",
          location: "Khu ẩm thực Chợ Lớn / Vĩnh Khánh / Cô Giang / Bến Thành",
          category: "food",
          cost: 800000,
          done: false,
          notes: "Oanh tạc các món ăn đêm nức tiếng Sài Gòn: Hủ tiếu Nam Vang, phá lấu bò, ốc xào me, bánh tráng nướng, chè trâu bà điên.",
          tip: "Đi xe máy hoặc bắt Grab dạo quanh ngắm phố phường Sài Gòn rực rỡ ánh đèn."
        },
        {
          id: "act-3-8",
          time: "22:00",
          title: "Về khách sạn nghỉ ngơi",
          location: "Khách sạn Sài Gòn",
          category: "rest",
          cost: 0,
          done: false,
          notes: "Về lại khách sạn, xem lại những bức ảnh kỷ niệm Mũi Né và ngủ một giấc thật ngon.",
          tip: "Chuẩn bị đồ đạc sẵn cho ngày cuối dạo chơi Takashimaya."
        }
      ]
    },
    {
      day: 4,
      date: "30/11/2026",
      dateTitle: "Ngày 4 (30/11): Sài Gòn Sáng ➔ Mua Sắm Takashimaya ➔ Sân Bay Tân Sơn Nhất ➔ Bay Về",
      theme: "city",
      hotel: "Sân bay Tân Sơn Nhất (SGN)",
      activities: [
        {
          id: "act-4-1",
          time: "07:30",
          title: "Ăn sáng cà phê bệt / Hủ tiếu Sài Gòn",
          location: "Khu vực Nhà thờ Đức Bà / Bưu điện Thành phố",
          category: "food",
          cost: 180000,
          done: false,
          notes: "Thưởng thức ly cà phê sữa đá đậm đà và ổ bánh mì Sài Gòn giòn rụm trong không khí se lạnh sớm mai.",
          tip: "Ngồi góc công viên 30/4 ngắm đàn chim bồ câu và nhịp sống Sài Gòn."
        },
        {
          id: "act-4-2",
          time: "08:30",
          title: "Dạo chơi & check-in phố phường Sài Gòn",
          location: "Phố đi bộ Nguyễn Huệ, Trụ sở UBND TP, Bến Bạch Đằng",
          category: "sightseeing",
          cost: 100000,
          done: false,
          notes: "Chụp hình check-in tại các công trình biểu tượng của TP.HCM và ngắm sông Sài Gòn tại Ga tàu thủy Bạch Đằng Waterbus.",
          tip: "Đi Waterbus ngắm skyline Sài Gòn từ dưới sông rất đẹp."
        },
        {
          id: "act-4-3",
          time: "12:30",
          title: "Ăn trưa Sài Gòn",
          location: "Quán ăn trung tâm Quận 1",
          category: "food",
          cost: 400000,
          done: false,
          notes: "Thưởng thức Cơm tấm bãi rác hoặc Dimsum chuẩn vị người Hoa.",
          tip: "Ăn no bụng trước khi đi dạo mua sắm."
        },
        {
          id: "act-4-4",
          time: "13:30",
          title: "Tham quan & Mua sắm tại Takashimaya (Saigon Centre)",
          location: "65 Lê Lợi, Bến Nghé, Quận 1",
          category: "shopping",
          cost: 300000,
          done: false,
          notes: "Trung tâm thương mại hiện đại bậc nhất Sài Gòn với các thương hiệu cao cấp, khu ẩm thực tầng B2 và nhiều góc check-in sang chảnh.",
          tip: "Ghé Annam Gourmet mua socola và quà lưu niệm cao cấp."
        },
        {
          id: "act-4-5",
          time: "14:30",
          title: "Về khách sạn nghỉ ngơi & Thu dọn hành lý",
          location: "Khách sạn Sài Gòn",
          category: "rest",
          cost: 0,
          done: false,
          notes: "Kiểm tra lại toàn bộ hành lý xách tay và ký gửi, quà cáp đóng gói cẩn thận.",
          tip: "Đừng quên kiểm tra giấy tờ tùy thân CCCD để làm thủ tục bay."
        },
        {
          id: "act-4-6",
          time: "16:00",
          title: "Check-out khách sạn, di chuyển ra sân bay Tân Sơn Nhất",
          location: "Sân bay Quốc tế Tân Sơn Nhất (Ga quốc nội T1)",
          category: "transport",
          cost: 200000,
          done: false,
          notes: "Bắt xe ra sân bay Tân Sơn Nhất. Giờ cao điểm chiều có thể kẹt xe nên đi sớm trước giờ bay ít nhất 2.5 - 3 tiếng.",
          tip: "Đến sân bay làm thủ tục gửi hành lý và qua cổng an ninh thảnh thơi."
        },
        {
          id: "act-4-7",
          time: "19:20",
          title: "Chuyến bay cất cánh về Vinh & Hà Nội",
          location: "Cảng hàng không quốc tế Tân Sơn Nhất (SGN)",
          category: "transport",
          cost: 1500000,
          done: false,
          notes: "Team Vinh (Diệu, Ly, Cường, Linh, Huy, Huyền, Thương) bay chuyến về lại Vinh lúc 19:20. Hiếu bay chuyến về lại Hà Nội. Kết thúc chuyến đi Sài Gòn - Phan Thiết - Mũi Né đầy ắp kỷ niệm đẹp!",
          tip: "Dùng tính năng 'Chia Tiền Nhóm' trên web để tổng kết và thanh toán quỹ chuyến đi trong tích tắc."
        }
      ]
    }
  ],

  // Điểm đến được cá nhân hóa theo đúng sheet
  recommendations: [
    {
      id: "rec-resort-1",
      name: "Centara Mirage Resort Mũi Né",
      type: "sightseeing",
      tag: "Resort 5 Sao Check-in",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      bestTime: "Cả ngày (Check-in 14:00)",
      price: "Resort đã đặt",
      highlight: "Khu nghỉ dưỡng 5 sao chủ đề 'Sân chơi của Người Khám Phá' phong cách Địa Trung Hải rực rỡ với hồ bơi vô cực 3 tầng nhìn thẳng ra vịnh Mũi Né.",
      tips: "Check-in tháp quan sát Faro, công viên nước trẻ em, và hồ bơi vô cực view biển."
    },
    {
      id: "rec-hotel-1",
      name: "Sunset Story Hotel Mũi Né",
      type: "sightseeing",
      tag: "Khách Sạn View Biển",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      bestTime: "Hoàng hôn 16:30 - 18:00",
      price: "Khách sạn Đêm 1",
      highlight: "Nằm tại 170/15 Nguyễn Minh Châu, sở hữu view biển thơ mộng, nơi diễn ra bữa tiệc sinh nhật ấm áp của Bún!",
      tips: "Góc ban công và sân thượng ngắm trọn cảnh biển lúc hoàng hôn buông xuống."
    },
    {
      id: "rec-food-1",
      name: "MỘT NẮNG Seafood Restaurant",
      type: "food",
      tag: "Hải Sản View Biển Đêm 1",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      bestTime: "18:00 - 20:00",
      price: "150k - 350k / người",
      highlight: "122 Nguyễn Đình Chiểu, Hàm Tiến. Không gian mở lãng mạn sát mép sóng biển, chuyên hải sản tươi sống và mực một nắng nướng trứ danh.",
      tips: "Nên đặt bàn trước bàn ngoài mép biển để có view đẹp nhất."
    },
    {
      id: "rec-food-2",
      name: "Nhà Hàng Muối Ớt Xanh Mũi Né",
      type: "food",
      tag: "Hải Sản Tươi Sống Đêm 2",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      bestTime: "19:00 - 21:30",
      price: "150k - 300k / người",
      highlight: "173 Nguyễn Đình Chiểu, Mũi Né. Quán hải sản được khách du lịch đánh giá cao về độ tươi ngon, giá cả hợp lý và sốt chấm muối ớt xanh gia truyền đặc sắc.",
      tips: "Thử món tôm nướng muối ớt xanh và sò dương mỡ hành."
    },
    {
      id: "rec-food-3",
      name: "Tiệm Cơm Dưới Tán Dừa & The Lobster",
      type: "food",
      tag: "Ăn Trưa Ngày 2",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
      bestTime: "11:00 - 13:00",
      price: "80k - 200k / người",
      highlight: "120 Nguyễn Đình Chiểu. Không gian rợp bóng dừa mát rượi, cơm gia đình thuần Việt đậm đà hoặc hải sản tại The Lobster kế bên.",
      tips: "Món cá kho tộ và canh chua cá bớp ăn kèm cơm trắng cực kỳ bắt vị."
    },
    {
      id: "rec-food-4",
      name: "Cơm Nhà Tiểu Mạch",
      type: "food",
      tag: "Ăn Trưa Ngày 3",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      bestTime: "11:00 - 13:00",
      price: "70k - 150k / người",
      highlight: "180/5 Nguyễn Đình Chiểu, Hàm Tiến. Quán cơm phong cách gia đình mộc mạc, chén đĩa gốm mộc, món ăn nêm nếm thanh đạm như cơm mẹ nấu.",
      tips: "Rất thích hợp ăn chắc bụng trước khi lên xe Limousine về lại Sài Gòn."
    },
    {
      id: "rec-cafe-1",
      name: "SOHO CF & Cafe Hừng Đông Mũi Né",
      type: "chill",
      tag: "Cafe Sống Ảo View Biển",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      bestTime: "08:30 - 10:30 sáng",
      price: "45k - 75k / món nước",
      highlight: "SOHO CF (182 Huỳnh Thúc Kháng) và Hừng Đông (72 Nguyễn Cơ Thạch) là hai toạ độ cafe sống ảo ven biển hot nhất Mũi Né hiện nay.",
      tips: "Nắng sáng chiếu xiên tạo hiệu ứng lấp lánh trên mặt biển chụp góc nào cũng như poster."
    },
    {
      id: "rec-sight-1",
      name: "The Silk Road Mũi Né",
      type: "chill",
      tag: "Tổ Hợp Check-in Nghệ Thuật",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      bestTime: "09:00 - 11:00 sáng",
      price: "Vé vào cổng kèm nước uống",
      highlight: "73 Trần Khát Chân, Mũi Né. Không gian kiến trúc lấy cảm hứng từ con đường tơ lụa huyền thoại, góc nào cũng mang vẻ đẹp sang trọng kỳ bí.",
      tips: "Trang phục màu trắng, be hoặc lụa bay tà cực kỳ ăn nhập với kiến trúc ở đây."
    },
    {
      id: "rec-jeep-1",
      name: "Tour Xe Jeep Bàu Trắng & Cung Đường Ven Biển",
      type: "activity",
      tag: "Highlight Chuyến Đi!",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      bestTime: "14:00 - 18:00 chiều",
      price: "Khoảng 600k - 800k / xe riêng",
      highlight: "Cung đường DT716 Xuân Thủy thẳng tắp, Đồi Cát Trắng bao la và Khu Du Lịch Bàu Trắng U&Me.",
      tips: "Thuê xe Jeep màu vàng/cam/hồng nổi bật, nhờ anh tài xế quay clip slow-motion vượt đồi cát!"
    },
    {
      id: "rec-mall-1",
      name: "Takashimaya Saigon Centre",
      type: "shopping",
      tag: "Mua Sắm Sài Gòn Ngày 4",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
      bestTime: "13:30 - 15:30",
      price: "Tùy nhu cầu",
      highlight: "65 Lê Lợi, Quận 1. Thiên đường mua sắm máy lạnh mát rượi giữa lòng Sài Gòn với các thương hiệu quốc tế và khu bánh ngọt Nhật Bản.",
      tips: "Ghé tầng B2 thử matcha kem Nhật và mua quà trước khi ra sân bay."
    }
  ],

  // Danh sách chuẩn bị đồ đạc
  packingList: [
    { id: "pack-bday", category: "Sinh Nhật Bún 🎂", item: "Quà sinh nhật cho Bún (gói xinh xắn)", checked: false },
    { id: "pack-bday-2", category: "Sinh Nhật Bún 🎂", item: "Nến số / Pháo que sinh nhật & bật lửa", checked: false },

    { id: "pack-1", category: "Giấy tờ & Vé máy bay", item: "CCCD / Hộ chiếu bản gốc (làm thủ tục bay & khách sạn)", checked: true },
    { id: "pack-2", category: "Giấy tờ & Vé máy bay", item: "Mã đặt chỗ vé máy bay (Vinh/HN ➔ SGN khứ hồi)", checked: true },
    { id: "pack-3", category: "Giấy tờ & Vé máy bay", item: "Xác nhận đặt xe Limousine 9 chỗ khứ hồi", checked: true },
    { id: "pack-4", category: "Giấy tờ & Vé máy bay", item: "Xác nhận đặt phòng Sunset Story & Centara Mirage", checked: true },

    { id: "pack-5", category: "Trang phục sống ảo", item: "Quần áo tone nổi bật (Trắng, Đỏ, Vàng, Boho) chụp xe Jeep Bàu Trắng", checked: false },
    { id: "pack-6", category: "Trang phục sống ảo", item: "Đồ bơi / Bikini chụp hồ bơi vô cực Centara Mirage", checked: false },
    { id: "pack-7", category: "Trang phục sống ảo", item: "Kính râm chống chói cát & nón rộng vành", checked: false },
    { id: "pack-8", category: "Trang phục sống ảo", item: "Dép đi biển & đồ gọn nhẹ để food tour Sài Gòn", checked: false },
    { id: "pack-9", category: "Trang phục sống ảo", item: "Áo khoác gió nhẹ (tránh nắng ban ngày & se lạnh sáng sớm)", checked: false },

    { id: "pack-11", category: "Mỹ phẩm & Chống nắng", item: "Kem chống nắng SPF 50+ PA++++ (Mũi Né nắng gió)", checked: false },
    { id: "pack-12", category: "Mỹ phẩm & Chống nắng", item: "Xịt khoáng / Kem dưỡng ẩm làm dịu da cháy nắng", checked: false },
    { id: "pack-13", category: "Mỹ phẩm & Chống nắng", item: "Khăn ướt lau cát & son dưỡng môi", checked: false },

    { id: "pack-15", category: "Công nghệ", item: "Sạc dự phòng dung lượng cao (chụp ảnh cả ngày)", checked: false },
    { id: "pack-16", category: "Công nghệ", item: "Túi chống nước điện thoại khi tắm biển & hồ bơi", checked: false },
    { id: "pack-17", category: "Công nghệ", item: "Gậy chụp ảnh / Tripod để chụp hình cả nhóm", checked: false },

    { id: "pack-18", category: "Y tế & Sức khỏe", item: "Thuốc say tàu xe & say máy bay", checked: false },
    { id: "pack-19", category: "Y tế & Sức khỏe", item: "Thuốc tiêu hóa / Men vi sinh (khi ăn nhiều hải sản)", checked: false },
    { id: "pack-20", category: "Y tế & Sức khỏe", item: "Băng dán cá nhân Urgo & thuốc cảm cúm cơ bản", checked: false }
  ],

  // Chi phí dự toán theo Google Sheet
  expenses: [
    { id: "exp-1", title: "Vé máy bay khứ hồi (Cả đoàn)", category: "transport", amount: 12000000, payer: "Hiếu", note: "Vé máy bay 8 thành viên" },
    { id: "exp-2", title: "Xe Limousine 9 chỗ khứ hồi SG ➔ Mũi Né", category: "transport", amount: 3200000, payer: "Cường", note: "Đón tại 28 Mai Chí Thọ & đón về resort" },
    { id: "exp-3", title: "Khách sạn Sunset Story Hotel (Đêm 1)", category: "hotel", amount: 2400000, payer: "Diệu", note: "170/15 Nguyễn Minh Châu view biển" },
    { id: "exp-4", title: "Centara Mirage Resort Mũi Né (Đêm 2)", category: "hotel", amount: 6400000, payer: "Huy", note: "Resort 5 sao có công viên nước & buffet sáng" },
    { id: "exp-5", title: "Khách sạn Sài Gòn (Đêm 3)", category: "hotel", amount: 1800000, payer: "Ly", note: "Khách sạn nghỉ ngơi để food tour SG" },
    { id: "exp-6", title: "Ăn tối hải sản MỘT NẮNG Seafood (Đêm 1)", category: "food", amount: 2400000, payer: "Hiếu", note: "122 Nguyễn Đình Chiểu view biển" },
    { id: "exp-7", title: "Bánh kem & Tiệc sinh nhật Bún", category: "activity", amount: 600000, payer: "Linh", note: "Bánh sinh nhật & quà chúc mừng" },
    { id: "exp-8", title: "Tour xe Jeep Bàu Trắng & Cung đường ven biển", category: "activity", amount: 1200000, payer: "Huyền", note: "Bao xe Jeep riêng đón tại resort" },
    { id: "exp-9", title: "Ăn tối hải sản Muối Ớt Xanh (Đêm 2)", category: "food", amount: 2200000, payer: "Thương", note: "173 Nguyễn Đình Chiểu" },
    { id: "exp-10", title: "Food Tour Sài Gòn (Đêm 3)", category: "food", amount: 1600000, payer: "Diệu", note: "Oanh tạc ẩm thực đêm Sài Gòn cho 8 người" }
  ],

  // Cẩm nang bổ trợ
  travelTips: [
    {
      title: "Cung đường Limousine & Cao tốc mới",
      content: "Điểm đón xe: 28 Đường Mai Chí Thọ (TP. Thủ Đức). Nhờ có Cao tốc Phan Thiết - Dầu Giây, xe Limousine 9 chỗ chỉ mất khoảng 2h30 - 3h là đến tận resort/khách sạn Mũi Né. Rất êm ái và không hề bị say xe."
    },
    {
      title: "Mẹo tour xe Jeep Bàu Trắng & KDL U&Me",
      content: "Tour xe Jeep xuất phát buổi chiều 14:00 rất thuận lợi vì vừa đón được nắng đẹp cung đường ven biển DT716, vừa kịp lên đỉnh Đồi Cát Trắng ngắm hoàng hôn buông xuống hồ Bàu Sen. Hãy nhờ anh tài xế chụp ảnh góc nghiêng bên hông xe Jeep màu vàng hoặc hồng."
    },
    {
      title: "Kinh nghiệm nghỉ dưỡng tại Centara Mirage",
      content: "Resort rất rộng với xe điện đưa đón trong khuôn viên. Khung giờ buffet sáng 07:00 - 10:00 rất đông nên đi sớm lúc 07:30 để có bàn view biển đẹp. Đừng quên mang 2 bộ đồ bơi để chụp hình ở cả 2 khu hồ bơi phân tầng và công viên nước."
    },
    {
      title: "Food Tour Sài Gòn đêm 29/11",
      content: "Sau khi về lại Sài Gòn, hãy dành buổi tối dạo phố ẩm thực Vĩnh Khánh (Quận 4) hoặc khu Chợ Lớn (Quận 5). Các món nhất định phải thử: Ốc hương xào bơ bắp bánh mì, súp cua bong bóng cá, chè Hà Ký và dạo ngắm Bến Bạch Đằng lung linh ánh đèn."
    }
  ]
};

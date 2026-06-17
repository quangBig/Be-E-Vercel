const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env file manually
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('.env file not found!');
    process.exit(1);
}

const dotenvContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
dotenvContent.split(/\r?\n/).forEach(line => {
    if (!line || line.startsWith('#')) return;
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const mongoUri = env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI not found in .env!');
    process.exit(1);
}

console.log('Connecting to MongoDB...');
mongoose.connect(mongoUri)
    .then(async () => {
        console.log('Connected to MongoDB. Seeding products...');

        // Define Mongoose Schema matching Product schema in NestJS
        const ProductSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: String,
            Outstandingfeatures: String,
            category: String,
            images: [String],
            variants: [
                {
                    name: { type: String, required: true },
                    price: { type: String, required: true },
                    discountedPrice: { type: String },
                    config: { type: String },
                    colors: [
                        {
                            name: { type: String },
                            value: { type: String },
                            hex: { type: String },
                            image: { type: String },
                            price: { type: String },
                            discountedPrice: { type: String }
                        }
                    ]
                }
            ]
        }, { timestamps: true });

        const Product = mongoose.model('Product', ProductSchema);

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // Apple Products Data (30 Products)
        const appleProducts = [
            // --- IPHONES (8 Products) ---
            {
                name: "iPhone 15 Pro Max",
                description: "iPhone 15 Pro Max sở hữu thiết kế titan chuẩn hàng không vũ trụ siêu bền, nhẹ. Trang bị nút Action mới, chip A17 Pro mạnh mẽ nhất hiện nay và camera zoom quang học 5x.",
                Outstandingfeatures: "Chip A17 Pro chơi game mượt mà; Khung sườn Titan bền nhẹ; Camera 48MP zoom 5x; Cổng kết nối USB-C tốc độ cao.",
                category: "iphone",
                images: [
                    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1695048133103-bc97e163b4b8?w=600&auto=format&fit=crop"
                ],
                variants: [
                    {
                        name: "iPhone 15 Pro Max 256GB",
                        price: "34990000",
                        discountedPrice: "29990000",
                        config: "256GB ROM, 8GB RAM",
                        colors: [
                            {
                                name: "Titan Tự Nhiên",
                                value: "Natural Titan",
                                hex: "#8a847c",
                                image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
                                price: "34990000",
                                discountedPrice: "29990000"
                            },
                            {
                                name: "Titan Xanh",
                                value: "Blue Titan",
                                hex: "#2f3a4f",
                                image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
                                price: "34990000",
                                discountedPrice: "29990000"
                            }
                        ]
                    },
                    {
                        name: "iPhone 15 Pro Max 512GB",
                        price: "40990000",
                        discountedPrice: "36490000",
                        config: "512GB ROM, 8GB RAM",
                        colors: [
                            {
                                name: "Titan Tự Nhiên",
                                value: "Natural Titan",
                                hex: "#8a847c",
                                image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
                                price: "40990000",
                                discountedPrice: "36490000"
                            }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 15 Pro",
                description: "iPhone 15 Pro với màn hình Super Retina XDR 6.1 inch, khung viền Titan siêu nhẹ, camera zoom 3x chất lượng cao cùng nút Action đa năng.",
                Outstandingfeatures: "Màn hình Promotion 120Hz; Khung Titan nhẹ nhất lịch sử Pro; Nút tác vụ Action Button; Chip A17 Pro hiệu năng cao.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 15 Pro 128GB",
                        price: "28990000",
                        discountedPrice: "24990000",
                        config: "128GB ROM, 8GB RAM",
                        colors: [
                            { name: "Titan Đen", value: "Black Titan", hex: "#232426", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop", price: "28990000", discountedPrice: "24990000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 15 Plus",
                description: "iPhone 15 Plus sở hữu màn hình lớn 6.7 inch, Dynamic Island cải tiến, camera chính 48MP và cổng sạc USB-C phổ biến.",
                Outstandingfeatures: "Màn hình lớn 6.7 inch; Đảo động Dynamic Island tiện lợi; Camera chính 48MP siêu nét; Pin trâu sử dụng cả ngày.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 15 Plus 128GB",
                        price: "25990000",
                        discountedPrice: "22490000",
                        config: "128GB ROM, 6GB RAM",
                        colors: [
                            { name: "Xanh Dương", value: "Blue", hex: "#cde4f0", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop", price: "25990000", discountedPrice: "22490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 15",
                description: "iPhone 15 bản tiêu chuẩn sở hữu thiết kế Dynamic Island hiện đại, mặt lưng kính pha màu sang trọng và chip A16 Bionic mạnh mẽ.",
                Outstandingfeatures: "Dynamic Island đột phá; Camera chính 48MP zoom 2x; Kính pha màu siêu mịn; Kết nối USB-C tiện dụng.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 15 128GB",
                        price: "22990000",
                        discountedPrice: "19790000",
                        config: "128GB ROM, 6GB RAM",
                        colors: [
                            { name: "Hồng", value: "Pink", hex: "#fae0e4", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop", price: "22990000", discountedPrice: "19790000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 14 Pro Max",
                description: "iPhone 14 Pro Max mở đầu cho kỷ nguyên Dynamic Island, chip A16 Bionic mượt mà cùng hệ thống camera 48MP chất lượng cao.",
                Outstandingfeatures: "Dynamic Island thế hệ đầu; Màn hình Always-On Display; Camera Pro 48MP quay phim Cinematic; Pin bền bỉ.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 14 Pro Max 128GB",
                        price: "29990000",
                        discountedPrice: "26490000",
                        config: "128GB ROM, 6GB RAM",
                        colors: [
                            { name: "Tím Đậm", value: "Deep Purple", hex: "#3b3047", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&auto=format&fit=crop", price: "29990000", discountedPrice: "26490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 14 Pro",
                description: "iPhone 14 Pro đem đến trải nghiệm màn hình Always-On Display, Dynamic Island thông minh trong một kích thước 6.1 inch nhỏ gọn.",
                Outstandingfeatures: "Dynamic Island thông minh; Màn hình 120Hz siêu sáng; Camera chính 48MP thu sáng vượt trội.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 14 Pro 128GB",
                        price: "24990000",
                        discountedPrice: "21990000",
                        config: "128GB ROM, 6GB RAM",
                        colors: [
                            { name: "Vàng Gold", value: "Gold", hex: "#f4e2d3", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop", price: "24990000", discountedPrice: "21990000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone 13",
                description: "iPhone 13 sở hữu cụm camera chéo độc đáo, thiết kế viền nhôm vuông vức cao cấp cùng chip xử lý Apple A15 hiệu năng cực tốt.",
                Outstandingfeatures: "Camera chéo đặc trưng; Chế độ quay phim Điện Ảnh Cinematic; Màn hình OLED siêu sáng; Giá cả cực kỳ hợp lý.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1632661676972-8f82540d114d?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone 13 128GB",
                        price: "16990000",
                        discountedPrice: "13590000",
                        config: "128GB ROM, 4GB RAM",
                        colors: [
                            { name: "Xanh Dương", value: "Blue", hex: "#2b4b66", image: "https://images.unsplash.com/photo-1632661676972-8f82540d114d?w=600&auto=format&fit=crop", price: "16990000", discountedPrice: "13590000" }
                        ]
                    }
                ]
            },
            {
                name: "iPhone SE (2022)",
                description: "iPhone SE thế hệ thứ 3 giữ thiết kế phím Home vật lý Touch ID cổ điển nhưng sở hữu sức mạnh xử lý cực khủng nhờ chip A15 Bionic.",
                Outstandingfeatures: "Thiết kế nhỏ gọn kèm Touch ID; Chip A15 Bionic mạnh mẽ; Hỗ trợ kết nối 5G tốc độ cao; Sự lựa chọn tiết kiệm nhất.",
                category: "iphone",
                images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPhone SE 64GB (2022)",
                        price: "11990000",
                        discountedPrice: "9990000",
                        config: "64GB ROM, 4GB RAM",
                        colors: [
                            { name: "Đỏ", value: "Red", hex: "#ba0c2f", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&auto=format&fit=crop", price: "11990000", discountedPrice: "9990000" }
                        ]
                    }
                ]
            },

            // --- IPADS (6 Products) ---
            {
                name: "iPad Pro M4 13-inch (2024)",
                description: "iPad Pro 13 inch hoàn toàn mới siêu mỏng, trang bị chip M4 đỉnh cao và màn hình hai lớp OLED Ultra Retina XDR rực rỡ nhất.",
                Outstandingfeatures: "Màn hình Tandem OLED 13 inch; Chip M4 hiệu năng trí tuệ nhân tạo; Độ mỏng chỉ 5.1mm cực ấn tượng.",
                category: "ipad",
                images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPad Pro M4 13-inch Wifi 256GB",
                        price: "37990000",
                        discountedPrice: "34490000",
                        config: "256GB ROM, 8GB RAM, Apple M4",
                        colors: [
                            { name: "Bạc", value: "Silver", hex: "#e3e4e5", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop", price: "37990000", discountedPrice: "34490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPad Pro M4 11-inch (2024)",
                description: "iPad Pro hoàn toàn mới được trang bị chip M4 siêu mạnh mẽ, màn hình Ultra Retina XDR sử dụng công nghệ OLED hai lớp tiên tiến, thiết kế siêu mỏng nhẹ chưa từng có.",
                Outstandingfeatures: "Chip M4 đỉnh cao hiệu năng; Màn hình Tandem OLED rực rỡ; Thiết kế mỏng nhất lịch sử Apple; Hỗ trợ Apple Pencil Pro.",
                category: "ipad",
                images: [
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=600&auto=format&fit=crop"
                ],
                variants: [
                    {
                        name: "iPad Pro M4 11-inch Wifi 256GB",
                        price: "28990000",
                        discountedPrice: "26990000",
                        config: "256GB ROM, 8GB RAM, Apple M4 Chip",
                        colors: [
                            {
                                name: "Bạc",
                                value: "Silver",
                                hex: "#e3e4e5",
                                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop",
                                price: "28990000",
                                discountedPrice: "26990000"
                            },
                            {
                                name: "Đen Không Gian",
                                value: "Space Black",
                                hex: "#2e3033",
                                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop",
                                price: "28990000",
                                discountedPrice: "26990000"
                            }
                        ]
                    }
                ]
            },
            {
                name: "iPad Air M2 13-inch (2024)",
                description: "Lần đầu tiên iPad Air có phiên bản màn hình lớn 13 inch, trang bị vi xử lý Apple M2 xử lý đồ họa mượt mà và thiết kế trẻ trung nhiều màu sắc.",
                Outstandingfeatures: "Không gian trải nghiệm rộng lớn 13 inch; Chip M2 cực kỳ mạnh mẽ; Camera trước ultra-wide đặt nằm ngang.",
                category: "ipad",
                images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPad Air M2 13-inch Wifi 128GB",
                        price: "22490000",
                        discountedPrice: "20490000",
                        config: "128GB ROM, 8GB RAM, Apple M2",
                        colors: [
                            { name: "Xám Không Gian", value: "Space Gray", hex: "#5d5e62", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop", price: "22490000", discountedPrice: "20490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPad Air M2 11-inch (2024)",
                description: "iPad Air 11 inch thế hệ mới với hiệu năng cực đỉnh nhờ chip M2, mỏng nhẹ hoàn hảo cho nhu cầu học tập và làm việc di động.",
                Outstandingfeatures: "Thiết kế 11 inch tiêu chuẩn; Hiệu năng đồ họa từ chip M2; Hỗ trợ Wi-Fi 6E siêu nhanh.",
                category: "ipad",
                images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPad Air M2 11-inch Wifi 128GB",
                        price: "16990000",
                        discountedPrice: "15490000",
                        config: "128GB ROM, 8GB RAM, Apple M2",
                        colors: [
                            { name: "Xanh Ánh Sao", value: "Starlight", hex: "#faf0e6", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop", price: "16990000", discountedPrice: "15490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPad 10.9-inch (Gen 10)",
                description: "iPad Gen 10 lột xác với thiết kế tràn viền hoàn toàn mới, loại bỏ nút Home, sử dụng cổng kết nối USB-C đa năng cùng nhiều màu sắc rực rỡ.",
                Outstandingfeatures: "Thiết kế tràn viền 10.9 inch; Cổng sạc USB-C tiện lợi; Chip A14 Bionic mượt mà; Nhiều phối màu cá tính.",
                category: "ipad",
                images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPad Gen 10 10.9-inch Wifi 64GB",
                        price: "10990000",
                        discountedPrice: "9490000",
                        config: "64GB ROM, 4GB RAM, Apple A14",
                        colors: [
                            { name: "Xanh Lam", value: "Blue", hex: "#4682b4", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop", price: "10990000", discountedPrice: "9490000" }
                        ]
                    }
                ]
            },
            {
                name: "iPad Mini 6 (2021)",
                description: "iPad Mini 6 là phiên bản máy tính bảng siêu nhỏ gọn cầm tay 8.3 inch, viền mỏng quyến rũ và cực kỳ mạnh mẽ.",
                Outstandingfeatures: "Kích thước 8.3 inch nhỏ gọn; Hỗ trợ Apple Pencil 2 gắn nam châm; Chip A15 Bionic cao cấp.",
                category: "ipad",
                images: ["https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "iPad Mini 6 Wifi 64GB",
                        price: "13990000",
                        discountedPrice: "12390000",
                        config: "64GB ROM, 4GB RAM, Apple A15",
                        colors: [
                            { name: "Tím", value: "Purple", hex: "#d8b4f8", image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop", price: "13990000", discountedPrice: "12390000" }
                        ]
                    }
                ]
            },

            // --- MACBOOKS & MACS (8 Products) ---
            {
                name: "MacBook Pro 16-inch M3 Max (2023)",
                description: "MacBook Pro 16 inch là cỗ máy đồ họa chuyên nghiệp tối thượng của Apple, tích hợp chip M3 Max thế hệ mới cùng quạt tản nhiệt hiệu năng cao.",
                Outstandingfeatures: "Chip M3 Max xử lý render 3D đỉnh cao; Màn hình Liquid Retina XDR 16 inch; Bộ nhớ RAM lên đến 36GB siêu khủng.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "MacBook Pro 16 M3 Max (36GB RAM / 1TB SSD)",
                        price: "99990000",
                        discountedPrice: "92990000",
                        config: "36GB RAM, 1TB SSD, 14-core CPU, 30-core GPU",
                        colors: [
                            { name: "Đen Không Gian", value: "Space Black", hex: "#2e3033", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", price: "99990000", discountedPrice: "92990000" }
                        ]
                    }
                ]
            },
            {
                name: "MacBook Pro 14-inch M3 Pro (2023)",
                description: "MacBook Pro sở hữu chip Apple M3 Pro tiến trình 3nm mang lại hiệu năng CPU và GPU vượt trội cho các tác vụ chuyên nghiệp, thời lượng pin lên tới 22 giờ.",
                Outstandingfeatures: "Chip M3 Pro hiệu năng đồ họa khủng; Màn hình Liquid Retina XDR 120Hz; Pin dùng liên tục 22 tiếng; Màu Đen Không Gian mới.",
                category: "macbook",
                images: [
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop"
                ],
                variants: [
                    {
                        name: "MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD)",
                        price: "49990000",
                        discountedPrice: "45990000",
                        config: "18GB Unified Memory, 512GB SSD, 11-core CPU, 14-core GPU",
                        colors: [
                            {
                                name: "Đen Không Gian",
                                value: "Space Black",
                                hex: "#2e3033",
                                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
                                price: "49990000",
                                discountedPrice: "45990000"
                            },
                            {
                                name: "Bạc",
                                value: "Silver",
                                hex: "#e3e4e5",
                                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
                                price: "49990000",
                                discountedPrice: "45990000"
                            }
                        ]
                    }
                ]
            },
            {
                name: "MacBook Pro 14-inch M3 (2023)",
                description: "Phiên bản MacBook Pro 14 inch kinh tế sử dụng vi xử lý Apple M3, phù hợp cho người dùng lập trình cơ bản và xử lý ảnh chất lượng cao.",
                Outstandingfeatures: "Màn hình Liquid Retina XDR; Chip M3 thế hệ mới; Hỗ trợ hiển thị 1 màn hình ngoài; Thiết kế tản nhiệt cực êm.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1496181130204-7552cc14b1e0?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "MacBook Pro 14 M3 (8GB RAM / 512GB SSD)",
                        price: "39990000",
                        discountedPrice: "36990000",
                        config: "8GB RAM, 512GB SSD, 8-core CPU, 10-core GPU",
                        colors: [
                            { name: "Xám Không Gian", value: "Space Gray", hex: "#5d5e62", image: "https://images.unsplash.com/photo-1496181130204-7552cc14b1e0?w=600&auto=format&fit=crop", price: "39990000", discountedPrice: "36990000" }
                        ]
                    }
                ]
            },
            {
                name: "MacBook Air 15-inch M3 (2024)",
                description: "MacBook Air 15 inch mỏng nhẹ đỉnh cao nay được tăng cường sức mạnh từ chip M3 và khả năng xuất cùng lúc 2 màn hình ngoài khi gập máy.",
                Outstandingfeatures: "Màn hình lớn 15.3 inch Liquid Retina; Thiết kế siêu mỏng nhẹ không quạt; Chip M3 hiệu năng mạnh mẽ.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "MacBook Air 15 M3 (16GB RAM / 512GB SSD)",
                        price: "37990000",
                        discountedPrice: "35490000",
                        config: "16GB RAM, 512GB SSD, 8-core CPU, 10-core GPU",
                        colors: [
                            { name: "Xanh Dương Khuya", value: "Midnight", hex: "#1e2430", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", price: "37990000", discountedPrice: "35490000" }
                        ]
                    }
                ]
            },
            {
                name: "MacBook Air 13-inch M3 (2024)",
                description: "MacBook Air 13 inch di động được nâng cấp lên vi xử lý M3, mang lại tốc độ xử lý nhanh hơn và hỗ trợ giải mã AV1 hiện đại.",
                Outstandingfeatures: "Kích thước 13.6 inch nhỏ gọn; Chip M3 tiết kiệm điện năng vượt trội; Vỏ nhôm tái chế thân thiện môi trường.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "MacBook Air 13 M3 (8GB RAM / 256GB SSD)",
                        price: "27990000",
                        discountedPrice: "24990000",
                        config: "8GB RAM, 256GB SSD, 8-core CPU",
                        colors: [
                            { name: "Ánh Sao", value: "Starlight", hex: "#faf0e6", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", price: "27990000", discountedPrice: "24990000" }
                        ]
                    }
                ]
            },
            {
                name: "MacBook Air 13-inch M2 (2022)",
                description: "MacBook Air M2 với ngôn ngữ thiết kế vuông vức hiện đại giống dòng Pro, viền màn hình mỏng kèm phần khuyết tai thỏ cá tính.",
                Outstandingfeatures: "Thiết kế mới đột phá; Sạc MagSafe 3 an toàn; Chip M2 xử lý đồ họa mượt mà; Giá thành cực mềm.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "MacBook Air 13 M2 (8GB RAM / 256GB SSD)",
                        price: "24990000",
                        discountedPrice: "21490000",
                        config: "8GB RAM, 256GB SSD, Apple M2",
                        colors: [
                            { name: "Xám Không Gian", value: "Space Gray", hex: "#5d5e62", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", price: "24990000", discountedPrice: "21490000" }
                        ]
                    }
                ]
            },
            {
                name: "Mac Studio M2 Max (2023)",
                description: "Cỗ máy tính bàn chuyên nghiệp siêu nhỏ gọn của Apple. Trang bị chip M2 Max với số lượng cổng kết nối cực kỳ đa dạng ở cả mặt trước và sau.",
                Outstandingfeatures: "Chip M2 Max hiệu năng máy bàn ấn tượng; Thiết kế tản nhiệt độc đáo; Rất nhiều cổng Thunderbolt 4 và khe thẻ SD.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "Mac Studio M2 Max (32GB RAM / 512GB SSD)",
                        price: "54990000",
                        discountedPrice: "50990000",
                        config: "32GB Unified Memory, 512GB SSD, 12-core CPU, 30-core GPU",
                        colors: [
                            { name: "Bạc", value: "Silver", hex: "#e3e4e5", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop", price: "54990000", discountedPrice: "50990000" }
                        ]
                    }
                ]
            },
            {
                name: "Mac Mini M2 (2023)",
                description: "Chiếc máy tính bàn tối giản nhỏ nhắn nhất của Apple nay sở hữu chip M2 đa nhiệm tuyệt vời cho các công việc văn phòng và làm nhạc.",
                Outstandingfeatures: "Kích thước vuông 19.7cm siêu nhỏ; Đầy đủ cổng HDMI, USB-A và Thunderbolt; Giá mua cực tốt cho học sinh sinh viên.",
                category: "macbook",
                images: ["https://images.unsplash.com/photo-1600541519468-4a9127539556?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "Mac Mini M2 (8GB RAM / 256GB SSD)",
                        price: "15990000",
                        discountedPrice: "14490000",
                        config: "8GB Unified Memory, 256GB SSD, Apple M2",
                        colors: [
                            { name: "Bạc", value: "Silver", hex: "#e3e4e5", image: "https://images.unsplash.com/photo-1600541519468-4a9127539556?w=600&auto=format&fit=crop", price: "15990000", discountedPrice: "14490000" }
                        ]
                    }
                ]
            },

            // --- WATCHES (4 Products) ---
            {
                name: "Apple Watch Ultra 2",
                description: "Chiếc đồng hồ thể thao chuyên nghiệp và bền bỉ nhất của Apple nay được trang bị chip S9 SiP siêu mạnh, hỗ trợ cử chỉ Chạm Hai Lần đột phá và màn hình sáng gấp đôi phiên bản tiền nhiệm.",
                Outstandingfeatures: "Màn hình độ sáng 3000 nits; Khung titan chắc chắn đạt chuẩn quân đội; GPS tần số kép siêu chính xác; Pin lên đến 36 giờ.",
                category: "watch",
                images: [
                    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop"
                ],
                variants: [
                    {
                        name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
                        price: "22990000",
                        discountedPrice: "20990000",
                        config: "Dây đeo Trail Loop Size M/L",
                        colors: [
                            {
                                name: "Titan Tự Nhiên",
                                value: "Titanium",
                                hex: "#c0c0c0",
                                image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop",
                                price: "22990000",
                                discountedPrice: "20990000"
                            }
                        ]
                    }
                ]
            },
            {
                name: "Apple Watch Series 9 Nhôm",
                description: "Apple Watch Series 9 với chip xử lý S9 SiP thông minh, hỗ trợ tính năng cử chỉ Double Tap và màn hình siêu sáng 2000 nits.",
                Outstandingfeatures: "Chip S9 SiP mạnh mẽ; Cử chỉ chạm hai lần thông minh; Theo dõi sức khỏe toàn diện (ECG, SpO2).",
                category: "watch",
                images: ["https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "Apple Watch Series 9 GPS 41mm Nhôm",
                        price: "10490000",
                        discountedPrice: "8990000",
                        config: "Viền Nhôm, Dây cao su Sport Band",
                        colors: [
                            { name: "Hồng", value: "Pink", hex: "#fae0e4", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop", price: "10490000", discountedPrice: "8990000" }
                        ]
                    }
                ]
            },
            {
                name: "Apple Watch Series 9 Thép",
                description: "Apple Watch Series 9 phiên bản cao cấp bằng thép không gỉ sáng bóng sang trọng, tích hợp kính sapphire chống xước siêu bền.",
                Outstandingfeatures: "Khung Thép không gỉ cao cấp; Mặt kính Sapphire siêu cứng; Hỗ trợ kết nối eSIM độc lập.",
                category: "watch",
                images: ["https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "Apple Watch Series 9 LTE 45mm Thép",
                        price: "20290000",
                        discountedPrice: "18490000",
                        config: "Viền Thép, Dây thép Milanese Loop",
                        colors: [
                            { name: "Vàng Gold", value: "Gold", hex: "#e6ca97", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop", price: "20290000", discountedPrice: "18490000" }
                        ]
                    }
                ]
            },
            {
                name: "Apple Watch SE (2023)",
                description: "Sự lựa chọn tối ưu chi phí của Apple để bắt đầu trải nghiệm Apple Watch. Đầy đủ các tính năng cơ bản như theo dõi nhịp tim, giấc ngủ và phát hiện té ngã.",
                Outstandingfeatures: "Giá thành dễ tiếp cận; Phát hiện va chạm & cuộc gọi khẩn cấp; Chống nước tốt đến 50m.",
                category: "watch",
                images: ["https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "Apple Watch SE 2023 GPS 40mm Nhôm",
                        price: "6390000",
                        discountedPrice: "5690000",
                        config: "Viền Nhôm, Dây cao su Sport Band",
                        colors: [
                            { name: "Đen Midnight", value: "Midnight", hex: "#1e2430", image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=600&auto=format&fit=crop", price: "6390000", discountedPrice: "5690000" }
                        ]
                    }
                ]
            },

            // --- AIRPODS (4 Products) ---
            {
                name: "AirPods Pro Gen 2 USB-C (2023)",
                description: "AirPods Pro thế hệ thứ 2 nay được trang bị cổng sạc USB-C thời thượng, chip H2 đem lại khả năng chủ động khử tiếng ồn mạnh mẽ gấp 2 lần, chất âm rõ nét vượt trội.",
                Outstandingfeatures: "Chip H2 xử lý âm thanh thông minh; Chống ồn chủ động ANC gấp đôi; Thời lượng pin lên đến 6 giờ nghe nhạc; Hộp sạc hỗ trợ Tìm Chính Xác.",
                category: "airpods",
                images: [
                    "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop"
                ],
                variants: [
                    {
                        name: "AirPods Pro Gen 2 (MagSafe USB-C)",
                        price: "6190000",
                        discountedPrice: "5390000",
                        config: "Hộp sạc MagSafe (USB-C)",
                        colors: [
                            {
                                name: "Trắng",
                                value: "White",
                                hex: "#ffffff",
                                image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop",
                                price: "6190000",
                                discountedPrice: "5390000"
                            }
                        ]
                    }
                ]
            },
            {
                name: "AirPods Gen 3 (Lightning / MagSafe)",
                description: "AirPods 3 mang thiết kế tai nghe dạng mở ôm tai thoải mái hơn, trang bị công nghệ Spatial Audio mô phỏng âm thanh vòm sống động như rạp hát.",
                Outstandingfeatures: "Âm thanh vòm Spatial Audio độc đáo; Kháng nước và mồ hôi chuẩn IPX4; Pin tổng cộng 30 giờ kèm hộp sạc.",
                category: "airpods",
                images: ["https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "AirPods Gen 3 (Lightning Charge)",
                        price: "4490000",
                        discountedPrice: "3990000",
                        config: "Hộp sạc cổng Lightning",
                        colors: [
                            { name: "Trắng", value: "White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop", price: "4490000", discountedPrice: "3990000" }
                        ]
                    }
                ]
            },
            {
                name: "AirPods Gen 2",
                description: "Tai nghe không dây quốc dân AirPods 2 nhỏ gọn, kết nối cực kỳ nhanh chóng và ổn định nhờ chip Apple H1 truyền thống.",
                Outstandingfeatures: "Chip H1 kết nối siêu tốc; Thiết kế nhét tai không núm vô cùng dễ đeo; Thời gian đàm thoại cực tốt.",
                category: "airpods",
                images: ["https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "AirPods Gen 2 Sạc Có Dây",
                        price: "3490000",
                        discountedPrice: "2690000",
                        config: "Hộp sạc dây truyền thống",
                        colors: [
                            { name: "Trắng", value: "White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=600&auto=format&fit=crop", price: "3490000", discountedPrice: "2690000" }
                        ]
                    }
                ]
            },
            {
                name: "AirPods Max (2020)",
                description: "Tai nghe chụp tai Over-Ear tối tân nhất của Apple. Cấu tạo từ khung thép và lưới dệt thoáng khí cao cấp, tích hợp driver dynamic tự thiết kế cho chất âm audiophile đỉnh cao.",
                Outstandingfeatures: "Driver dynamic 40mm tự phát triển; Khử tiếng ồn chủ động ANC đỉnh cao; Chế độ âm thanh xuyên âm xuất sắc; Núm vặn Digital Crown tiện lợi.",
                category: "airpods",
                images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop"],
                variants: [
                    {
                        name: "AirPods Max MagSafe",
                        price: "13990000",
                        discountedPrice: "12490000",
                        config: "Kèm Smart Case thông minh tiết kiệm pin",
                        colors: [
                            { name: "Xám Không Gian", value: "Space Gray", hex: "#5d5e62", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop", price: "13990000", discountedPrice: "12490000" },
                            { name: "Bạc", value: "Silver", hex: "#e3e4e5", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop", price: "13990000", discountedPrice: "12490000" }
                        ]
                    }
                ]
            }
        ];

        await Product.insertMany(appleProducts);
        console.log(`Seeded ${appleProducts.length} Apple products successfully!`);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error during seeding:', err);
    });

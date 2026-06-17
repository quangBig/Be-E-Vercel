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
        console.log('Connected to MongoDB. Seeding page-products...');

        const PageProductsSchema = new mongoose.Schema({
            name: { type: String, required: true },
            slug: { type: String, required: true },
            image: { type: String, required: true },
            bannerVideo: {
                url: String
            },
            bannerContent: [
                {
                    image: String,
                    title: String,
                    description: String
                }
            ],
            bannerConnect: [
                {
                    image: String,
                    content: String,
                    mainContent: String
                }
            ]
        }, { timestamps: true });

        // Force collection name to be 'pageproducts' (Mongoose defaults to lowercase plural)
        const PageProducts = mongoose.model('PageProduct', PageProductsSchema, 'pageproducts');

        // Clear existing page products
        await PageProducts.deleteMany({});
        console.log('Cleared existing page-products.');

        // Page Products data
        const pages = [
            {
                name: "iPhone",
                slug: "/iphone",
                image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300",
                bannerVideo: {
                    url: "https://www.apple.com/105/media/us/iphone-15-pro/2023/2f33072e-1907-4e7c-b19e-1d14fc7c7e52/anim/hero/large_2x.mp4"
                },
                bannerContent: [
                    {
                        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
                        title: "iPhone 15 Pro Max",
                        description: "Titanium. Siêu bền. Siêu nhẹ. Siêu Pro."
                    }
                ],
                bannerConnect: [
                    {
                        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800",
                        content: "Kết nối hệ sinh thái Apple hoàn hảo",
                        mainContent: "iPhone của bạn kết nối mượt mà với Mac, iPad và Apple Watch."
                    }
                ]
            },
            {
                name: "iPad",
                slug: "/ipad",
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
                bannerVideo: {
                    url: ""
                },
                bannerContent: [
                    {
                        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
                        title: "iPad Pro M4",
                        description: "Mỏng nhẹ kinh ngạc. Sức mạnh vượt thời gian."
                    }
                ],
                bannerConnect: [
                    {
                        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800",
                        content: "Sáng tạo không giới hạn",
                        mainContent: "Sử dụng Apple Pencil Pro và Magic Keyboard cùng iPad của bạn."
                    }
                ]
            },
            {
                name: "MacBook",
                slug: "/macbook",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
                bannerVideo: {
                    url: ""
                },
                bannerContent: [
                    {
                        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
                        title: "MacBook Pro M3 Pro",
                        description: "Hiệu năng chuyên nghiệp khủng khiếp."
                    }
                ],
                bannerConnect: [
                    {
                        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
                        content: "Làm việc hiệu quả hơn",
                        mainContent: "Màn hình Liquid Retina XDR và thời lượng pin lên đến 22 giờ."
                    }
                ]
            },
            {
                name: "Apple Watch",
                slug: "/watch",
                image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300",
                bannerVideo: {
                    url: ""
                },
                bannerContent: [
                    {
                        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
                        title: "Apple Watch Ultra 2",
                        description: "Đột phá mới cho những hành trình khắc nghiệt."
                    }
                ],
                bannerConnect: [
                    {
                        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800",
                        content: "Theo dõi sức khỏe tối ưu",
                        mainContent: "Cảm biến nhịp tim, điện tâm đồ ECG và nồng độ oxy trong máu SpO2."
                    }
                ]
            },
            {
                name: "AirPods",
                slug: "/airpods",
                image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=300",
                bannerVideo: {
                    url: ""
                },
                bannerContent: [
                    {
                        image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=800",
                        title: "AirPods Pro Gen 2",
                        description: "Âm thanh thích ứng. Chống ồn chủ động gấp đôi."
                    }
                ],
                bannerConnect: [
                    {
                        image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800",
                        content: "Kết nối tức thì",
                        mainContent: "Chỉ cần mở nắp hộp sạc cạnh iPhone để kết nối ngay lập tức."
                    }
                ]
            }
        ];

        await PageProducts.insertMany(pages);
        console.log(`Seeded ${pages.length} page-products successfully!`);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error during seeding:', err);
    });

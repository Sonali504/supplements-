export async function GET() {
  
    const products = [
        { 
          "id": 1,
          "name": "Whey Protein",
          "price": 1229,
          "oldPrice": 1849,
          "discount": "37%",
          "image": "/images/protein1.jpg",
          "category": "Proteins",
          "rating": 4,
          "description":"Boost your fitness journey with our high-quality Whey Protein, designed to support muscle growth, recovery, and overall performance. Made from pure whey concentrate and isolate, it delivers a rich source of protein to fuel your body post-workout or throughout the day.",
          "shipping": "Ships within 2-4 business days.",
          "returns": "7-day return policy. Must be unused and in original packaging.",
          "thumbnails": [
            "/images/protein1.jpg",
            "/images/protein1.jpg",
            "/images/protein1.jpg"
          ]
          },
          { 
            "id": 2, 
            "name": "Mass Gainer", 
            "price": 1595, 
            "oldPrice": 2399, 
            "image": "/images/protein2.jpg", 
            "category": "Gainers", 
            "rating": 4.5, 
            "description": "Achieve your weight gain and muscle-building goals with our high-quality Mass Gainer. Designed for individuals struggling to gain weight or build muscle, this formula provides a high-calorie blend of proteins, carbohydrates, and essential nutrients to support muscle recovery, strength, and overall performance. Whether you're a hard gainer, an athlete, or a fitness enthusiast, our Mass Gainer helps you bulk up effectively.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein2.jpg",
            "/images/protein2.jpg",
            "/images/protein2.jpg"
          ]
          },
          {
            "id": 3,
            "name": "Creatine Capsules",
            "price": 1499,
            "oldPrice": 2499,
            "image": "/images/protein3.jpg",
            "category": "Creatine",
            "rating": 2.5,
            "description": "Boost your strength, endurance, and workout performance with our premium Creatine Capsules. Formulated with pure creatine monohydrate, these capsules help enhance muscle power, reduce fatigue, and improve recovery time. Ideal for athletes, bodybuilders, and fitness enthusiasts, creatine is scientifically proven to support muscle growth and increase energy levels during high-intensity workouts.\n\nWhy Choose Our Creatine Capsules?\n🔹 Increases Strength & Power – Helps improve overall performance in weightlifting, sprinting, and high-intensity training.\n\n🔹 Enhances Muscle Recovery – Reduces muscle soreness and accelerates post-workout recovery, allowing for consistent training.\n\n🔹 Supports Lean Muscle Growth – Aids in muscle volumization and cell hydration, leading to improved endurance and muscle gains.\n\n🔹 Easy-to-Take Capsules – No mixing required! Convenient and precise dosing with each capsule, making it travel-friendly and hassle-free.\n\n🔹 Pure & High-Quality Creatine – Contains no fillers, artificial additives, or unnecessary ingredients—just pure creatine monohydrate for maximum effectiveness.\n\n🔹 Ideal for All Fitness Levels – Whether you’re a beginner or an advanced athlete, creatine supports all training goals.\n\nWho Can Use It?\n✔️ Strength Athletes & Bodybuilders – For explosive power and muscle gains.\n✔️ Runners & Endurance Athletes – Helps sustain energy and delay fatigue.\n✔️ Fitness Enthusiasts – Supports overall athletic performance and strength.\n✔️ Beginners & Experienced Lifters – A great addition to any workout regimen.\n\nHow to Use:\n- **Daily Serving:** Take 3-5 capsules with water before or after workouts.\n- **Loading Phase (Optional):** For faster results, take 5 capsules twice a day for the first 5-7 days. Maximize your workout potential and take your fitness to new heights with our powerful Creatine Capsules!",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein3.jpg",
            "/images/protein3.jpg",
            "/images/protein3.jpg"
          ]
           },  
           {
            "id": 4,
            "name": "Gold Whey",
            "price": 792,
            "oldPrice": 800,
            "image": "/images/protein4.jpg",
            "category": "Pre Workout",
            "rating": 3.5,
            "description": "Fuel your workouts with our premium Gold Whey, a high-quality protein supplement designed to support muscle growth, recovery, and overall performance. Made from a blend of whey protein concentrate and isolate, this formula ensures fast absorption and provides essential amino acids for optimal muscle support. Whether you’re an athlete, bodybuilder, or fitness enthusiast, Gold Whey helps you achieve your fitness goals efficiently.\n\nWhy Choose Gold Whey?\n🔹 High-Quality Whey Protein – Delivers a rich source of protein to support muscle repair, strength, and lean muscle development.\n\n🔹 Fast Absorption – Formulated for quick digestion, ensuring your muscles get the nutrients they need post-workout.\n\n🔹 Rich in BCAAs – Contains essential branched-chain amino acids (BCAAs) like leucine, isoleucine, and valine to reduce muscle fatigue and promote recovery.\n\n🔹 Enhances Endurance & Strength – Perfect for pre-workout and post-workout nutrition to keep you energized and support performance.\n\n🔹 Smooth & Delicious Taste – Easily mixes with water or milk, offering a creamy texture with no chalky aftertaste.\n\n🔹 Low in Carbs & No Added Sugar – Ideal for those following a low-carb or fitness-focused diet.\n\nWho Can Use It?\n✔️ Athletes & Bodybuilders – For muscle repair, growth, and enhanced performance.\n✔️ Fitness Enthusiasts – To maintain lean muscle and overall strength.\n✔️ Active Individuals – A great protein source for daily nutrition and muscle maintenance.\n✔️ Those on a High-Protein Diet – Supports protein intake without unnecessary carbs or fats.\n\nHow to Use:\n- **Post-Workout:** Mix 1 scoop with 200-250ml of water or milk and shake well.\n- **Daily Protein Boost:** Consume anytime during the day to meet protein requirements.\n\nExperience the power of high-quality protein with Gold Whey and take your fitness journey to the next level!",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein4.jpg",
            "/images/protein4.jpg",
            "/images/protein4.jpg"
          ]
          },  
          {
            "id": 5,
            "name": "Protein Blend",
            "price": 1792,
            "oldPrice": 2800,
            "discount": "20%",
            "image": "/images/protein5.jpg",
            "category": "BCAAs",
            "rating": 3,
            "description": "A powerful mix of high-quality proteins, our Protein Blend supports muscle growth, recovery, and endurance. Rich in essential amino acids and BCAAs, it ensures optimal performance for athletes and fitness enthusiasts. Enjoy smooth mixing, great taste, and a balanced formula designed to fuel your workouts!",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein5.jpg",
            "/images/protein5.jpg",
            "/images/protein5.jpg"
          ]
          },
          {
            "id": 6,
            "name": "Nakpore Mass Gainer",
            "price": 1292,
            "oldPrice": 2000,
            "image": "/images/protein6.jpg",
            "category": "Vitamins",
            "rating": 4.5,
            "description": "Achieve your weight gain and muscle-building goals with Nakpore Mass Gainer, a premium high-calorie supplement designed for those looking to build size, strength, and endurance. Packed with a balanced blend of proteins, carbohydrates, and essential vitamins, this mass gainer provides sustained energy and promotes lean muscle growth. It also contains digestive enzymes to improve nutrient absorption, making it easy on the stomach. Whether you're a hard gainer struggling to put on mass or an athlete needing extra calories, Nakpore Mass Gainer ensures you get the right nutrition for maximum results. Enjoy a smooth, delicious taste and fuel your body with the ultimate muscle-building formula!",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein6.jpg",
            "/images/protein6.jpg",
            "/images/protein6.jpg"
          ]
          },
          {
            "id": 7,
            "name": "Black Pure Whey",
            "price": 1592,
            "oldPrice": 2500,
            "image": "/images/protein7.jpg",
            "category": "Proteins",
            "rating": 3.5,
            "description": "Black Pure Whey is a high-quality protein supplement designed to fuel muscle growth, strength, and recovery. Made from a premium blend of whey protein concentrate and isolate, this formula ensures rapid absorption and delivers essential amino acids for optimal performance. Whether you're an athlete, bodybuilder, or fitness enthusiast, Black Pure Whey provides the perfect balance of protein and nutrients to support your fitness goals. It is rich in BCAAs, easy to digest, and blends smoothly for a delicious and satisfying shake. With no added sugar and a low-carb formula, it’s ideal for those looking to build lean muscle while maintaining a healthy diet.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein7.jpg",
            "/images/protein7.jpg",
            "/images/protein7.jpg"
          ]
        },
          {
            "id": 8,
            "name": "Power Whey",
            "price": 799,
            "oldPrice": 1800,
            "image": "/images/protein8.jpg",
            "category": "Gainers",
            "rating": 3,
            "description": "Power Whey is a premium protein supplement designed to support muscle gain, recovery, and overall strength. Formulated with a blend of high-quality whey protein, essential amino acids, and BCAAs, it helps enhance endurance, reduce muscle fatigue, and accelerate post-workout recovery. Whether you're a beginner or an experienced athlete, Power Whey provides the right balance of protein and nutrients to fuel your fitness goals. It mixes easily, has a rich taste, and contains no added sugar, making it an ideal choice for those looking to build lean muscle mass while maintaining a clean diet.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein8.jpg",
            "/images/protein8.jpg",
            "/images/protein8.jpg"
          ]
          },
          {
            "id": 9,
            "name": "Whey Protein Pack",
            "price": 592,
            "oldPrice": 799,
            "image": "/images/protein9.jpg",
            "category": "Pre Workout",
            "rating": 3.5,
            "description": "Whey Protein Pack is the perfect pre-workout supplement designed to fuel your muscles with high-quality protein and essential nutrients. This fast-absorbing formula supports muscle growth, enhances endurance, and aids in quick recovery, making it ideal for athletes, bodybuilders, and fitness enthusiasts. Packed with BCAAs and essential amino acids, it helps reduce muscle fatigue and keeps you energized for intense workouts. With a smooth texture, great taste, and easy mixability, Whey Protein Pack is a convenient way to boost your protein intake and maximize your performance.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein9.jpg",
            "/images/protein9.jpg",
            "/images/protein9.jpg"
          ]
          },
          {
            "id": 10,
            "name": "Clear Whey Protein",
            "price": 2792,
            "oldPrice": 3800,
            "image": "/images/protein10.jpg",
            "category": "Vitamins",
            "rating": 3,
            "description": "Clear Whey Protein is a light and refreshing alternative to traditional protein shakes, offering all the benefits of premium whey protein in a smooth, juice-like texture. Designed for easy digestion and quick absorption, it helps support muscle recovery, strength, and endurance. Packed with essential amino acids and BCAAs, this protein supplement is perfect for post-workout hydration and lean muscle development. With no heavy texture or milky consistency, Clear Whey Protein is an excellent choice for those looking for a clean, refreshing protein boost without unnecessary additives.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein10.jpg",
            "/images/protein10.jpg",
            "/images/protein10.jpg"
          ]
          },
          {
            "id": 11,
            "name": "Diet Clear Protein",
            "price": 1999,
            "oldPrice": 2999,
            "discount": "17%",
            "image": "/images/protein11.jpg",
            "category": "Creatine",
            "rating": 4,
            "description": "Diet Clear Protein is a scientifically formulated protein supplement designed to support weight management, lean muscle growth, and overall health. With a light, refreshing texture, it provides high-quality protein without excess calories or carbohydrates, making it ideal for those on a calorie-controlled diet. Enriched with essential amino acids and digestive enzymes, it ensures quick absorption and muscle recovery. Whether you're looking to lose fat, build muscle, or stay energized throughout the day, Diet Clear Protein is the perfect low-calorie, high-protein choice for a healthy lifestyle.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein11.jpg",
            "/images/protein11.jpg",
            "/images/protein11.jpg"
          ]
          },
          {
            "id": 12,
            "name": "Clear Whey Isolate",
            "price": 999,
            "image": "/images/protein12.jpg",
            "category": "BCAAs",
            "rating": 2.5,
            "description": "Clear Whey Isolate is a revolutionary protein supplement designed for athletes and fitness enthusiasts who prefer a lighter, refreshing alternative to traditional protein shakes. This supplement provides high-quality whey protein isolate that is rapidly absorbed by the body, supporting muscle recovery, lean muscle growth, and overall endurance. Its clear and hydrating formula makes it easy to consume post-workout, ensuring you stay energized and replenished throughout the day.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein12.jpg",
            "/images/protein12.jpg",
            "/images/protein12.jpg"
          ]
        },
        {
            "id": 13,
            "name": "Coconut Isolate Whey",
            "price": 3792,
            "oldPrice": 5800,
            "image": "/images/protein13.jpg",
            "category": "Proteins",
            "rating": 3,
            "description": "Coconut Isolate Whey is a premium protein blend infused with natural coconut flavor to give you a delicious and tropical experience while supporting your fitness goals. It is packed with high-quality whey protein isolate, providing essential amino acids that aid in muscle repair, recovery, and strength building. This protein supplement is ideal for individuals looking to enhance their daily protein intake while enjoying a smooth and refreshing taste with every sip.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein13.jpg",
            "/images/protein13.jpg",
            "/images/protein13.jpg"
          ]
        },
        {
            "id": 14,
            "name": "Whey Chocolate Powder",
            "price": 1592,
            "oldPrice": 2200,
            "discount": "25%",
            "image": "/images/protein14.jpg",
            "category": "Gainers",
            "rating": 3.5,
            "description": "Whey Chocolate Powder is the ultimate protein supplement for chocolate lovers who want to fuel their workouts with a delicious and nutritious boost. This high-protein formula contains a blend of whey protein concentrate and isolate, delivering essential nutrients needed for muscle growth, strength enhancement, and post-workout recovery. It mixes easily with water or milk, creating a smooth and creamy shake that satisfies your cravings while keeping you on track with your fitness journey.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein14.jpg",
            "/images/protein14.jpg",
            "/images/protein14.jpg"
          ]
        },
        {
            "id": 15,
            "name": "Nack Creatine",
            "price": 2592,
            "oldPrice": 3800,
            "image": "/images/protein15.jpg",
            "category": "Pre Workout",
            "rating": 4.5,
            "description": "Nack Creatine is a scientifically formulated pre-workout supplement designed to enhance muscle performance, endurance, and recovery. It contains pure creatine monohydrate, which helps increase strength and power output during high-intensity workouts. Regular use of this supplement supports muscle volumization, reduces fatigue, and improves workout efficiency. Whether you're an athlete, bodybuilder, or fitness enthusiast, Nack Creatine provides the energy boost you need to achieve your fitness goals.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein15.jpg",
            "/images/protein15.jpg",
            "/images/protein15.jpg"
          ]
        },
          {
            "id": 16,
            "name": "Plant-Based Protein",
            "price": 1992,
            "oldPrice": 2800,
            "discount": "30%",
            "image": "/images/protein16.jpg",
            "category": "Vitamins",
            "rating": 3.5,
            "description": "Plant-Based Protein is a 100% vegan and dairy-free protein supplement designed to meet the nutritional needs of individuals looking for a natural, clean, and sustainable protein source. It is made from high-quality plant-based ingredients like pea and brown rice protein, offering a complete amino acid profile that supports muscle recovery, digestion, and overall wellness. This easy-to-digest formula is free from artificial additives, making it an excellent choice for those with dietary restrictions or a preference for plant-powered nutrition.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein16.jpg",
            "/images/protein16.jpg",
            "/images/protein16.jpg"
          ]
          },
          {
            "id": 17,
            "name": "Nakpore Creatine",
            "price": 2999,
            "oldPrice": 3999,
            "image": "/images/protein17.jpg",
            "category": "BCAAs",
            "rating": 3,
            "description": "Nakpore Creatine is a high-performance creatine supplement specifically formulated to improve athletic performance, muscle strength, and endurance. With regular use, this supplement helps increase muscle hydration, boost ATP production, and accelerate muscle recovery. It is ideal for athletes engaging in high-intensity workouts, weightlifting, and endurance training. The formula is free from fillers and additives, ensuring maximum absorption and effectiveness for superior training results.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein17.jpg",
            "/images/protein17.jpg",
            "/images/protein17.jpg"
          ]
        },
        {
            "id": 18,
            "name": "100% Mass Gainer",
            "price": 1792,
            "oldPrice": 2800,
            "image": "/images/protein18.jpg",
            "category": "Proteins",
            "rating": 3.5,
            "description": "100% Mass Gainer is a specially designed weight gain supplement that provides a perfect balance of protein, carbohydrates, and essential nutrients to support lean muscle development and increase body mass. Whether you're a hard gainer struggling to put on weight or an athlete looking for extra calories, this formula offers high-quality whey protein along with complex carbs for sustained energy. It helps improve muscle recovery, endurance, and overall strength, making it an excellent addition to any fitness regimen.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein18.jpg",
            "/images/protein18.jpg",
            "/images/protein18.jpg"
          ]
        },
        {
            "id": 19,
            "name": "Gold Whey",
            "price": 1492,
            "oldPrice": 2600,
            "discount": "17%",
            "image": "/images/protein19.jpg",
            "category": "Gainers",
            "rating": 3,
            "description": "Gold Whey is a top-tier protein supplement known for its high protein content and fast-absorbing formula, making it an ideal choice for fitness enthusiasts and bodybuilders. This premium blend supports muscle recovery, enhances lean muscle growth, and provides the essential amino acids needed for improved athletic performance. With a smooth texture and a delicious taste, Gold Whey is a great post-workout drink that fuels your body and helps you achieve your fitness goals more efficiently.",
            "shipping": "Ships within 2-4 business days.",
            "returns": "No returns on opened items.",
            "thumbnails": [
            "/images/protein19.jpg",
            "/images/protein19.jpg",
            "/images/protein19.jpg"
          ]
        }
    ];
  
    return Response.json(products);
  }
  
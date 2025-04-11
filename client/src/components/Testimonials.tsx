'use client'
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/Testimonials.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BsQuote } from 'react-icons/bs';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
    subject: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Minh Anh",
        role: "Học sinh lớp 12",
        image: "https://images.unsplash.com/photo-1596935884413-260a972dab44?w=400&h=400&fit=crop",
        content: "Nhờ có gia sư, điểm số của mình đã cải thiện rõ rệt. Phương pháp giảng dạy dễ hiểu và thân thiện giúp mình tiếp thu bài học nhanh hơn.",
        subject: "Toán học"
    },
    {
        id: 2,
        name: "Hoàng Nam",
        role: "Học sinh lớp 11",
        image: "https://images.unsplash.com/photo-1588953936179-d2a4734c5490?w=400&h=400&fit=crop",
        content: "Gia sư không chỉ giúp mình học tốt hơn mà còn truyền cảm hứng để mình yêu thích môn học này. Cảm ơn thầy cô rất nhiều!",
        subject: "Vật lý"
    },
    {
        id: 3,
        name: "Thu Hà",
        role: "Phụ huynh học sinh",
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
        content: "Con tôi đã có những tiến bộ vượt bậc trong học tập. Gia sư rất tận tâm và chuyên nghiệp.",
        subject: "Tiếng Anh"
    }
];

export default function Testimonials() {
    return (
        <section className={styles.testimonialSection}>
            <Container>
                <h2 className={styles.sectionTitle}>Phản hồi từ học viên</h2>
                <p className={styles.sectionSubtitle}>
                    Những chia sẻ chân thực từ học viên của chúng tôi
                </p>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className={styles.testimonialSwiper}
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className={styles.testimonialCard}>
                                <div className={styles.quoteIcon}>
                                    <BsQuote />
                                </div>
                                <p className={styles.testimonialContent}>
                                    {testimonial.content}
                                </p>
                                <div className={styles.testimonialFooter}>
                                    <div className={styles.testimonialImage}>
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                    <div className={styles.testimonialInfo}>
                                        <h4 className={styles.testimonialName}>
                                            {testimonial.name}
                                        </h4>
                                        <p className={styles.testimonialRole}>
                                            {testimonial.role} - {testimonial.subject}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
} 
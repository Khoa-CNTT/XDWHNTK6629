'use client'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/TutorList.module.css';
import { BsStar, BsStarFill } from 'react-icons/bs';

interface Tutor {
    id: number;
    name: string;
    subject: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    experience: string;
}

const tutors: Tutor[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        subject: "Toán học",
        rating: 4.9,
        reviews: 128,
        price: 200000,
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
        experience: "5 năm kinh nghiệm"
    },
    {
        id: 2,
        name: "Trần Thị B",
        subject: "Tiếng Anh",
        rating: 4.8,
        reviews: 95,
        price: 180000,
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
        experience: "4 năm kinh nghiệm"
    },
    {
        id: 3,
        name: "Lê Văn C",
        subject: "Vật lý",
        rating: 5.0,
        reviews: 156,
        price: 220000,
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
        experience: "6 năm kinh nghiệm"
    },
    {
        id: 4,
        name: "Phạm Thị D",
        subject: "Hóa học",
        rating: 4.7,
        reviews: 89,
        price: 190000,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        experience: "3 năm kinh nghiệm"
    }
];

export default function TutorList() {
    const renderRating = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <span key={index}>
                {index < Math.floor(rating) ? (
                    <BsStarFill className={styles.starFilled} />
                ) : (
                    <BsStar className={styles.star} />
                )}
            </span>
        ));
    };

    return (
        <section className={styles.tutorListSection}>
            <Container>
                <h2 className={styles.sectionTitle}>Gia sư nổi bật</h2>
                <p className={styles.sectionSubtitle}>
                    Khám phá những gia sư xuất sắc nhất của chúng tôi
                </p>
                <Row className="g-4">
                    {tutors.map((tutor) => (
                        <Col key={tutor.id} xs={12} sm={6} lg={3}>
                            <Card className={styles.tutorCard}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        width={300}
                                        height={300}
                                        className={styles.tutorImage}
                                    />
                                </div>
                                <Card.Body>
                                    <h3 className={styles.tutorName}>{tutor.name}</h3>
                                    <p className={styles.tutorSubject}>{tutor.subject}</p>
                                    <div className={styles.tutorRating}>
                                        {renderRating(tutor.rating)}
                                        <span className={styles.ratingText}>
                                            {tutor.rating} ({tutor.reviews} đánh giá)
                                        </span>
                                    </div>
                                    <p className={styles.tutorExperience}>{tutor.experience}</p>
                                    <p className={styles.tutorPrice}>
                                        {tutor.price.toLocaleString('vi-VN')}đ/giờ
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
} 
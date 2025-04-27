'use client'
import { Container, Row, Col, Button, Tab, Nav } from 'react-bootstrap';
import { BsStar, BsStarFill, BsCalendar, BsClock, BsGeoAlt, BsCheck2, BsGlobe } from 'react-icons/bs';
import Image from 'next/image';
import styles from './TutorDetail.module.css';
import { useEffect, useState } from 'react';

interface TutorDetailProps {
    id: number;
}

export default function TutorDetail({ id }: TutorDetailProps) {
    const [isClient, setIsClient] = useState(false);
    const [tutor, setTutor] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        // Giả lập việc lấy dữ liệu từ API dựa vào ID
        // Trong thực tế, bạn sẽ fetch dữ liệu từ API tại đây
        const tutorData = {
            id: id,
            name: "Nguyễn Văn A",
            subject: "Toán học",
            rating: 4.9,
            reviewCount: 128,
            price: 200000,
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
            experience: "5 năm kinh nghiệm",
            about: "Tôi là giáo viên Toán với hơn 5 năm kinh nghiệm giảng dạy. Tốt nghiệp Đại học Sư phạm Hà Nội, tôi đã dạy cho nhiều học sinh từ cấp 2 đến cấp 3 và đạt được nhiều thành tích giảng dạy xuất sắc.",
            methodology: "Phương pháp giảng dạy của tôi tập trung vào việc hiểu rõ khái niệm cơ bản trước khi đi vào giải bài tập phức tạp. Tôi thường kết hợp giữa lý thuyết và thực hành, giúp học sinh phát triển tư duy logic và khả năng giải quyết vấn đề.",
            location: "Hà Nội",
            languages: ["Tiếng Việt", "Tiếng Anh"],
            education: "Cử nhân Sư phạm Toán, Đại học Sư phạm Hà Nội",
            subjects: ["Toán cấp 2", "Toán cấp 3", "Đại số", "Hình học"],
            schedule: {
                monday: ["18:00 - 20:00"],
                tuesday: ["18:00 - 20:00"],
                wednesday: ["18:00 - 20:00"],
                thursday: [],
                friday: ["18:00 - 20:00"],
                saturday: ["9:00 - 11:00", "14:00 - 16:00"],
                sunday: ["9:00 - 11:00"]
            },
            reviewsList: [
                {
                    id: 1,
                    user: "Trần Bình",
                    rating: 5,
                    date: "15/10/2023",
                    content: "Thầy dạy rất tận tâm và dễ hiểu. Con tôi tiến bộ rất nhiều sau khi học với thầy."
                },
                {
                    id: 2,
                    user: "Lê Hoa",
                    rating: 5,
                    date: "20/09/2023",
                    content: "Phương pháp giảng dạy rất hiệu quả, giúp con tôi từ điểm kém trở thành học sinh giỏi Toán."
                },
                {
                    id: 3,
                    user: "Nguyễn Minh",
                    rating: 4,
                    date: "05/08/2023",
                    content: "Thầy giáo nhiệt tình, giải thích rõ ràng, dễ hiểu. Rất hài lòng với kết quả học tập."
                }
            ]
        };
        setTutor(tutorData);
    }, [id]);

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

    if (!tutor) {
        return <div className={styles.loading}>Đang tải thông tin...</div>;
    }

    return (
        <div className={styles.tutorDetailPage}>
            <Container>
                {/* Header Section */}
                <section className={styles.tutorHeader}>
                    <Row>
                        <Col md={4} className={styles.imageCol}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={tutor.image}
                                    alt={tutor.name}
                                    width={300}
                                    height={300}
                                    className={styles.tutorImage}
                                />
                            </div>
                        </Col>
                        <Col md={8}>
                            <div className={styles.tutorInfo}>
                                <h1 className={styles.tutorName}>{tutor.name}</h1>
                                <div className={styles.subjectBadge}>{tutor.subject}</div>
                                <div className={styles.tutorRating}>
                                    {renderRating(tutor.rating)}
                                    <span className={styles.ratingText}>
                                        {tutor.rating} ({tutor.reviewCount} đánh giá)
                                    </span>
                                </div>
                                <div className={styles.tutorMeta}>
                                    <div className={styles.metaItem}>
                                        <BsGeoAlt />
                                        <span>{tutor.location}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <BsGlobe />
                                        <span>{tutor.languages.join(', ')}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <BsClock />
                                        <span>{tutor.experience}</span>
                                    </div>
                                </div>
                                <div className={styles.priceSection}>
                                    <div className={styles.price}>
                                        {isClient ? tutor.price.toLocaleString('vi-VN') : tutor.price}đ/giờ
                                    </div>
                                    <Button variant="danger" className={styles.bookButton}>
                                        Đặt lịch học
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* Tab Section */}
                <section className={styles.tabSection}>
                    <Tab.Container defaultActiveKey="about">
                        <Nav variant="tabs" className={styles.tabNav}>
                            <Nav.Item>
                                <Nav.Link eventKey="about" className={styles.tabLink}>Giới thiệu</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="methodology" className={styles.tabLink}>Phương pháp giảng dạy</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="schedule" className={styles.tabLink}>Lịch dạy</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews" className={styles.tabLink}>Đánh giá</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className={styles.tabContent}>
                            <Tab.Pane eventKey="about" className={styles.tabPane}>
                                <h3>Về tôi</h3>
                                <p>{tutor.about}</p>

                                <div className={styles.infoSection}>
                                    <h4>Học vấn</h4>
                                    <p>{tutor.education}</p>
                                </div>

                                <div className={styles.infoSection}>
                                    <h4>Môn học</h4>
                                    <ul className={styles.subjectList}>
                                        {tutor.subjects.map((subject: string, index: number) => (
                                            <li key={index} className={styles.subjectItem}>
                                                <BsCheck2 className={styles.checkIcon} />
                                                <span>{subject}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="methodology" className={styles.tabPane}>
                                <h3>Phương pháp giảng dạy</h3>
                                <p>{tutor.methodology}</p>
                            </Tab.Pane>

                            <Tab.Pane eventKey="schedule" className={styles.tabPane}>
                                <h3>Lịch dạy</h3>
                                <div className={styles.scheduleGrid}>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 2</h5>
                                        {tutor.schedule.monday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.monday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 3</h5>
                                        {tutor.schedule.tuesday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.tuesday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 4</h5>
                                        {tutor.schedule.wednesday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.wednesday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 5</h5>
                                        {tutor.schedule.thursday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.thursday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 6</h5>
                                        {tutor.schedule.friday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.friday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Thứ 7</h5>
                                        {tutor.schedule.saturday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.saturday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                    <div className={styles.scheduleDay}>
                                        <h5>Chủ nhật</h5>
                                        {tutor.schedule.sunday.length > 0 ? (
                                            <ul className={styles.timeSlots}>
                                                {tutor.schedule.sunday.map((slot: string, index: number) => (
                                                    <li key={index}>{slot}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.noSlots}>Không có lịch</p>
                                        )}
                                    </div>
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="reviews" className={styles.tabPane}>
                                <h3>Đánh giá từ học viên</h3>
                                <div className={styles.reviewsList}>
                                    {tutor.reviewsList.map((review: any) => (
                                        <div key={review.id} className={styles.reviewItem}>
                                            <div className={styles.reviewHeader}>
                                                <div className={styles.reviewUser}>{review.user}</div>
                                                <div className={styles.reviewRating}>
                                                    {renderRating(review.rating)}
                                                </div>
                                                <div className={styles.reviewDate}>{review.date}</div>
                                            </div>
                                            <div className={styles.reviewContent}>{review.content}</div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </section>
            </Container>
        </div>
    );
} 
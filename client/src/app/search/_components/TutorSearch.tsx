'use client'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './TutorSearch.module.css';
import Image from 'next/image';
import { BsStar, BsStarFill, BsHeart, BsHeartFill, BsChevronLeft, BsChevronRight, BsGeoAlt } from 'react-icons/bs';

interface FilterOption {
    id: string;
    label: string;
}

interface Tutor {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    description: string;
    image: string;
    level: string;
    firstLessonFree: boolean;
    teachingGrades: string[];
    teachingMethods: string[];
    subjects: string[];
}

export default function TutorSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState({
        teachingMethod: [] as string[],
        priceRange: [] as string[],
        grades: [] as string[],
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        setIsClient(true);
        const subject = searchParams.get('subject');
        if (subject) {
            setSearchQuery(subject);
        }
    }, [searchParams]);

    const filters = {
        teachingMethod: [
            { id: 'online', label: 'Online' },
            { id: 'face-to-face', label: 'Trực tiếp' },
        ],
        priceRange: [
            { id: 'under-150', label: 'Dưới 150.000đ/giờ' },
            { id: '150-200', label: '150.000đ - 200.000đ/giờ' },
            { id: '200-250', label: '200.000đ - 250.000đ/giờ' },
            { id: 'over-250', label: 'Trên 250.000đ/giờ' },
        ],
        grades: [
            { id: 'grade-12', label: 'Lớp 12' },
            { id: 'grade-11', label: 'Lớp 11' },
            { id: 'grade-10', label: 'Lớp 10' },
            { id: 'grade-9', label: 'Lớp 9' },
            { id: 'grade-8', label: 'Lớp 8' },
            { id: 'grade-7', label: 'Lớp 7' },
            { id: 'grade-6', label: 'Lớp 6' },
            { id: 'primary', label: 'Tiểu học' },
        ],
    };

    const tutors: Tutor[] = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            location: "Hà Nội (trực tiếp & online)",
            rating: 5,
            reviews: 12,
            price: 200000,
            description: "Giáo viên có 5 năm kinh nghiệm giảng dạy, chuyên môn sâu về Toán học và Vật lý",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Toán học', 'Vật lý']
        },
        {
            id: 2,
            name: "Trần Thị B",
            location: "TP.HCM (online)",
            rating: 4.9,
            reviews: 28,
            price: 250000,
            description: "Thạc sĩ Toán học, 7 năm kinh nghiệm luyện thi đại học môn Toán",
            image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['11', '12'],
            teachingMethods: ['online'],
            subjects: ['Toán học']
        },
        {
            id: 3,
            name: "Lê Văn C",
            location: "Đà Nẵng (trực tiếp)",
            rating: 4.8,
            reviews: 15,
            price: 180000,
            description: "Sinh viên năm cuối ĐH Bách Khoa, chuyên dạy Toán - Lý cho học sinh cấp 2, 3",
            image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
            level: "New",
            firstLessonFree: true,
            teachingGrades: ['8', '9', '10'],
            teachingMethods: ['face-to-face'],
            subjects: ['Toán học', 'Vật lý']
        },
        {
            id: 4,
            name: "Phạm Thị D",
            location: "Hà Nội (trực tiếp & online)",
            rating: 4.7,
            reviews: 89,
            price: 190000,
            description: "Giáo viên trường chuyên, 3 năm kinh nghiệm giảng dạy Hóa học cho học sinh THPT",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: false,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Hóa học']
        },
        {
            id: 5,
            name: "Hoàng Văn E",
            location: "TP.HCM (trực tiếp & online)",
            rating: 4.6,
            reviews: 72,
            price: 185000,
            description: "Thạc sĩ Sinh học, 4 năm kinh nghiệm giảng dạy tại các trường THPT",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Sinh học']
        },
        {
            id: 6,
            name: "Đỗ Thị F",
            location: "Hà Nội (trực tiếp)",
            rating: 4.9,
            reviews: 118,
            price: 195000,
            description: "Giáo viên dạy Văn giỏi cấp Thành phố, 7 năm kinh nghiệm luyện thi THPT",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['face-to-face'],
            subjects: ['Ngữ văn']
        },
        {
            id: 7,
            name: "Vũ Văn G",
            location: "TP.HCM (online)",
            rating: 4.8,
            reviews: 84,
            price: 175000,
            description: "Giảng viên khoa Lịch sử, 5 năm kinh nghiệm giảng dạy tại các trường THPT",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online'],
            subjects: ['Lịch sử']
        },
        {
            id: 8,
            name: "Ngô Thị H",
            location: "Đà Nẵng (trực tiếp & online)",
            rating: 4.7,
            reviews: 65,
            price: 170000,
            description: "Giáo viên trường chuyên, 3 năm kinh nghiệm giảng dạy Địa lý cho học sinh THPT",
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Địa lý']
        },
        {
            id: 9,
            name: "Trịnh Văn I",
            location: "Hà Nội (online)",
            rating: 4.9,
            reviews: 92,
            price: 210000,
            description: "Thạc sĩ Vật lý, 6 năm kinh nghiệm giảng dạy, chuyên gia luyện thi đại học",
            image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: true,
            teachingGrades: ['11', '12'],
            teachingMethods: ['online'],
            subjects: ['Vật lý']
        },
        {
            id: 10,
            name: "Mai Thị K",
            location: "TP.HCM (trực tiếp & online)",
            rating: 4.8,
            reviews: 76,
            price: 195000,
            description: "Giáo viên Tiếng Anh, 5 năm kinh nghiệm, chuyên luyện thi IELTS và TOEIC",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Tiếng Anh']
        },
        {
            id: 11,
            name: "Nguyễn Thị L",
            location: "Hà Nội (trực tiếp & online)",
            rating: 4.9,
            reviews: 103,
            price: 230000,
            description: "Giáo viên dạy Toán 15 năm kinh nghiệm, nhiều học sinh đạt giải quốc gia",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: false,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Toán học']
        },
        {
            id: 12,
            name: "Trần Văn M",
            location: "Hải Phòng (trực tiếp)",
            rating: 4.5,
            reviews: 41,
            price: 160000,
            description: "Sinh viên giỏi ĐH Sư phạm, 2 năm kinh nghiệm dạy Toán cho học sinh THCS",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
            level: "New",
            firstLessonFree: true,
            teachingGrades: ['6', '7', '8', '9'],
            teachingMethods: ['face-to-face'],
            subjects: ['Toán học']
        },
        {
            id: 13,
            name: "Lê Thị N",
            location: "TP.HCM (online)",
            rating: 4.7,
            reviews: 58,
            price: 185000,
            description: "Giáo viên dạy Vật lý tại trường THPT, 6 năm kinh nghiệm luyện thi đại học",
            image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online'],
            subjects: ['Vật lý']
        },
        {
            id: 14,
            name: "Phạm Văn O",
            location: "Huế (trực tiếp & online)",
            rating: 4.6,
            reviews: 37,
            price: 175000,
            description: "Giáo viên Hóa học 8 năm kinh nghiệm, chuyên sư phạm Hóa ĐHQG",
            image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Hóa học']
        },
        {
            id: 15,
            name: "Hoàng Thị P",
            location: "Cần Thơ (trực tiếp)",
            rating: 4.8,
            reviews: 49,
            price: 165000,
            description: "Giáo viên Tiếng Anh tại trung tâm ngoại ngữ, chuyên luyện thi TOEIC và giao tiếp",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['8', '9', '10', '11', '12'],
            teachingMethods: ['face-to-face'],
            subjects: ['Tiếng Anh']
        },
        {
            id: 16,
            name: "Nguyễn Văn Q",
            location: "Đà Nẵng (online)",
            rating: 4.9,
            reviews: 68,
            price: 190000,
            description: "Thạc sĩ Toán học, 9 năm kinh nghiệm giảng dạy, chuyên gia về Đại số và Giải tích",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: false,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online'],
            subjects: ['Toán học']
        },
        {
            id: 17,
            name: "Trần Thị R",
            location: "Hà Nội (trực tiếp & online)",
            rating: 4.7,
            reviews: 53,
            price: 180000,
            description: "Giáo viên Ngữ văn tại trường THPT chuyên, có kinh nghiệm ôn thi học sinh giỏi",
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Ngữ văn']
        },
        {
            id: 18,
            name: "Lê Văn S",
            location: "TP.HCM (trực tiếp)",
            rating: 4.5,
            reviews: 32,
            price: 195000,
            description: "Giáo viên dạy Hóa học 7 năm kinh nghiệm, chuyên luyện thi đại học khối A, B",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['face-to-face'],
            subjects: ['Hóa học']
        },
        {
            id: 19,
            name: "Hoàng Thị T",
            location: "Vũng Tàu (trực tiếp & online)",
            rating: 4.6,
            reviews: 44,
            price: 170000,
            description: "Giáo viên dạy Tiếng Anh cho học sinh THCS và THPT, chuyên ngữ pháp và giao tiếp",
            image: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?w=400&h=400&fit=crop",
            level: "Pro",
            firstLessonFree: true,
            teachingGrades: ['6', '7', '8', '9', '10', '11', '12'],
            teachingMethods: ['online', 'face-to-face'],
            subjects: ['Tiếng Anh']
        },
        {
            id: 20,
            name: "Nguyễn Thị U",
            location: "Nha Trang (online)",
            rating: 4.8,
            reviews: 57,
            price: 210000,
            description: "Thạc sĩ Sư phạm Văn, 8 năm kinh nghiệm giảng dạy, chuyên gia phân tích tác phẩm văn học",
            image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
            level: "Super Prof",
            firstLessonFree: false,
            teachingGrades: ['10', '11', '12'],
            teachingMethods: ['online'],
            subjects: ['Ngữ văn']
        }
    ];

    const handleFilterClick = (filterType: string) => {
        setActiveFilter(activeFilter === filterType ? null : filterType);
    };

    const handleOptionSelect = (filterType: string, option: string) => {
        setSelectedFilters(prev => {
            const currentFilters = [...prev[filterType as keyof typeof selectedFilters]];
            const index = currentFilters.indexOf(option);

            if (index === -1) {
                currentFilters.push(option);
            } else {
                currentFilters.splice(index, 1);
            }

            return {
                ...prev,
                [filterType]: currentFilters
            };
        });
    };

    const toggleFavorite = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const renderFilterDropdown = (filterType: string, options: { id: string; label: string }[]) => {
        if (activeFilter !== filterType) return null;

        return (
            <div className={styles.filterDropdown}>
                {options.map(option => (
                    <label key={option.id} className={styles.filterOption}>
                        <input
                            type="checkbox"
                            checked={selectedFilters[filterType as keyof typeof selectedFilters].includes(option.id)}
                            onChange={() => handleOptionSelect(filterType, option.id)}
                        />
                        {option.label}
                    </label>
                ))}
                <div className={styles.filterActions}>
                    <div
                        className={styles.applyButton}
                        onClick={() => setActiveFilter(null)}
                    >
                        Áp dụng
                    </div>
                </div>
            </div>
        );
    };

    const filteredTutors = tutors.filter(tutor => {
        if (!searchQuery) return true;
        
        const subjectMatch = tutor.subjects.some(subject => 
            subject.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        const descriptionMatch = tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return subjectMatch || descriptionMatch;
    });

    const tutorsPerPage = 9;
    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);
    const currentTutors = filteredTutors.slice(
        currentPage * tutorsPerPage,
        (currentPage + 1) * tutorsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : prev));
    };

    const handleTutorClick = (tutorId: number) => {
        router.push(`/tutor/${tutorId}`);
    };

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

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1 || totalPages === 0;

    return (
        <section className={styles.tutorListSection}>
            <div className={styles.contentContainer}>
                <div className={styles.searchHeader}>
                    <h1 className={styles.title}>
                        {searchQuery 
                            ? `Tìm gia sư môn ${searchQuery}` 
                            : "Gia sư tại khu vực của bạn"}
                    </h1>
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'teachingMethod' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('teachingMethod')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Hình thức học
                                </div>
                                {renderFilterDropdown('teachingMethod', filters.teachingMethod)}
                            </div>

                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'priceRange' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('priceRange')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Học phí
                                </div>
                                {renderFilterDropdown('priceRange', filters.priceRange)}
                            </div>

                            <div className={styles.filterWrapper}>
                                <div
                                    className={`${styles.filterButton} ${activeFilter === 'grades' ? styles.active : ''}`}
                                    onClick={() => handleFilterClick('grades')}
                                    role="button"
                                    tabIndex={0}
                                >
                                    Lớp giảng dạy
                                </div>
                                {renderFilterDropdown('grades', filters.grades)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tutorCount}>
                    {filteredTutors.length > 0 
                        ? `Tìm thấy ${filteredTutors.length} gia sư ${searchQuery ? `môn ${searchQuery}` : ''}`
                        : `Không tìm thấy gia sư nào ${searchQuery ? `môn ${searchQuery}` : ''}`
                    }
                </div>

                <Row className="g-4">
                    {currentTutors.map((tutor) => (
                        <Col key={tutor.id} xs={12} md={6} lg={4}>
                            <Card
                                className={styles.tutorCard}
                                onClick={() => handleTutorClick(tutor.id)}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={styles.tutorImage}
                                        priority
                                    />
                                    <div className={`${styles.levelBadge} ${
                                        tutor.level === 'Super Prof' ? styles.superProf : 
                                        tutor.level === 'Pro' ? styles.pro : styles.new
                                    }`}>
                                        {tutor.level}
                                    </div>
                                    <button
                                        className={styles.favoriteButton}
                                        onClick={(e) => toggleFavorite(tutor.id, e)}
                                        aria-label={
                                            favorites.includes(tutor.id) 
                                                ? "Remove from favorites" 
                                                : "Add to favorites"
                                        }
                                    >
                                        {favorites.includes(tutor.id) ? <BsHeartFill style={{color: '#ff4757'}} /> : <BsHeart />}
                                    </button>
                                    {tutor.firstLessonFree && (
                                        <div className={styles.firstLessonFree}>Buổi học đầu tiên miễn phí</div>
                                    )}
                                </div>
                                <Card.Body className="p-3">
                                    <div className={styles.tutorInfo}>
                                        <h3 className={styles.tutorName}>{tutor.name}</h3>
                                        <p className={styles.tutorLocation}>
                                            <BsGeoAlt className={styles.locationIcon} /> {tutor.location}
                                        </p>
                                        <div className={styles.tutorRating}>
                                            {renderRating(tutor.rating)}
                                            <span className={styles.ratingText}>
                                                {tutor.rating.toFixed(1)} ({tutor.reviews} đánh giá)
                                            </span>
                                        </div>
                                        <p className={styles.tutorExperience}>{tutor.description}</p>
                                        <div className={styles.tutorPrice}>
                                            <span className={styles.price}>
                                                {isClient ? `${tutor.price.toLocaleString('vi-VN')}đ/giờ` : `${tutor.price}đ/giờ`}
                                            </span>
                                            <button className={styles.viewButton}>Xem chi tiết</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {isClient && filteredTutors.length > tutorsPerPage && (
                    <div className={styles.paginationContainer}>
                        <div className={styles.paginationButtonWrapper}>
                            <button
                                className={styles.paginationButton}
                                onClick={handlePrevPage}
                                disabled={isFirstPage}
                                aria-label="Trang trước"
                            >
                                <BsChevronLeft />
                            </button>
                        </div>

                        <div className={styles.paginationInfo}>
                            Trang {currentPage + 1} / {totalPages}
                        </div>

                        <div className={styles.paginationButtonWrapper}>
                            <button
                                className={styles.paginationButton}
                                onClick={handleNextPage}
                                disabled={isLastPage}
                                aria-label="Trang tiếp theo"
                            >
                                <BsChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
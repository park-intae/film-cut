import { useEffect, useState } from "react";
import styles from "./css/Memo.module.css";

const Memo = () => {
    const [content, setContent] = useState('');
    const [memos, setMemos] = useState(() => {
        // 초기값으로 로컬스토리지에서 불러오기
        const savedMemos = localStorage.getItem('memos');
        return savedMemos ? JSON.parse(savedMemos) : [];
    });

    // 메모 수정/저장
    useEffect(() => {
        localStorage.setItem('memos', JSON.stringify(memos));
    }, [memos]);

    // 메모 추가
    const addMemo = () => {
        if (content.trim() === '') return;
        const newMemo = {
            id: Date.now(),
            content,
        };
        setMemos((prevMemos) => [...prevMemos, newMemo]);
        setContent('');
    }

    // 메모 삭제
    const deleteMemo = (id) => {
        setMemos((prevMemos) => prevMemos.filter((note) => note.id !== id));
    };

    return (
        <div className={styles.memoSection}>
            <div className={styles.memoInput}>
                <h2>메모장</h2>{/* css 추가하면 나중에 지우셈 */}
                <div className={styles.memoInputSection}>
                    <textarea className={styles.inputBox}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="노트 내용을 적어주세요"
                        rows="1"
                        cols="30"
                    />
                    <button className={styles.inputButton} onClick={addMemo}>메모 추가</button>
                </div>
                <div className={styles.memoList}>
                    <h2>메모 리스트</h2>
                    <ul>
                        {memos.map((note) => (
                            <li key={note.id}>
                                <span className={styles.memoContent}>{note.content}</span>
                                <button onClick={() => deleteMemo(note.id)}>메모 삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Memo;

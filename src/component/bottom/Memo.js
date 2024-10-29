import { useEffect, useState } from "react";
import styles from "./css/Memo.module.css";

const Memo = ({ loggedIn, AddMemo}) => {
    const storageKey = loggedIn ? 'memos_logged_in' : 'memos_logged_out';
    const [content, setContent] = useState('');
    const [memos, setMemos] = useState(() => {
        // 초기값으로 로컬스토리지에서 불러오기
        const savedMemos = localStorage.getItem('memos');
        return savedMemos ? JSON.parse(savedMemos) : [];
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(memos));
    }, [memos, storageKey]);

    const addMemoHandler = () => {
        if (content.trim() === '') return;
        const newMemo = {
            id: Date.now(),
            content,
        };
        setMemos((prevMemos) => [...prevMemos, newMemo]);
        setContent('');
        AddMemo(newMemo);
    }

    const deleteMemo = (id) => {
        setMemos((prevMemos) => prevMemos.filter((note) => note.id !== id));
    };

    return (
        <div className={styles.memoSection}>
            <div className={`${styles.memoInput} container mt-3`}>
                <div className={`${styles.memoInputSection} input-group mb-3`}>
                    <textarea className={`${styles.inputBox} form-control w-70`}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                addMemoHandler();
                            }
                        }}
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Memo"
                        rows="1"
                        cols="30"
                    />
                    <button className={`${styles.inputButton} btn btn-outline-primary`} 
                    // style={{width:'10%'}} 
                    onClick={addMemoHandler}>메모추가</button>
                </div>
                <div className={`${styles.memoList} mb-3`}>
                    <div className="container-sm">메모 리스트</div>
                    <ul className="list-group">
                        {memos.map((note) => (
                            <li className="list-group-item" style={{display:'flex'}} key={note.id}>
                                <span className={`${styles.memoContent}`} style={{flexBasis:'70%', flexGrow:'2', display: 'flex', alignItems: 'center'}}>{note.content}</span>
                                <button className="btn btn-danger" style={{flexBasis:'20%', flexGrow:'0'}} onClick={() => deleteMemo(note.id)}>메모 삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Memo;

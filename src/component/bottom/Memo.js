import { memo, useEffect, useState } from "react"


const Memo = () => {
    const [content, setContent] = useState('');
    const [memos, setMemos] = useState([]);

    // 메모 불러오기
    useEffect(() => {
        const saveNotes = JSON.parse(localStorage.getItem('memos'));
        if (saveNotes){
            setMemos(saveNotes);
        }
    },[]);

    // 메모 수정/저장
    useEffect(() => {
        localStorage.setItem('memos', JSON.stringify(memos));
    },[memos])

    // 메모 추가
    const addMemo = () => {
        if (content.trim() === '') return;
        const newMemo = {
            id: Date.now(),
            content,
        };
        setMemos([...memos, newMemo]);
        setContent('');
    }

    //메모 삭제
    const deleteMemo = (id) => {
        const updateMemos = memos.filter((note) => note.id !== id);
        setMemos(updateMemos);
    };

    return (
        <div>
            <h2>메모장</h2>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="노트 내용을 적어주세요"
                row="5"
                cols="20"
            />
            <br/>
            <button onClick={addMemo}>메모추가</button>

            <h2>메모 리스트</h2>
            <ul>
                {memos.map((note) => (
                    <li key={memo.id}>
                        <p>{note.content}</p>
                        <button onClick={() => deleteMemo(note.id)}>메모삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Memo;
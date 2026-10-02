import OrchidCard from './OrchidCard';

// { orchids } là destructuring: lấy prop orchids từ object props.
export default function OrchidsPresentation({ orchids }) {
  return (
    <section className="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Living collection</p>
          <h2 id="collection-title">Sixteen remarkable orchids</h2>
        </div>
        {/* length là giá trị được tính trực tiếp từ mảng, không cần state. */}
        <p>{orchids.length} specimens · 12 genera</p>
      </div>

      <div className="orchid-grid">
        {/* map biến mỗi object thành một card. key giúp React nhận diện ổn định
            từng phần tử khi danh sách được thêm, xóa hoặc sắp xếp lại. */}
        {orchids.map((orchid) => <OrchidCard key={orchid.id} orchid={orchid} />)}
      </div>
    </section>
  );
}

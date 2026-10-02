import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const fallbackImage = `${import.meta.env.BASE_URL}orchid-placeholder.svg`;

// Modal chỉ nhận dữ liệu và callback qua props; state thật nằm ở container.
export default function OrchidModal({ orchid, onClose }) {
  function showFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  }

  // Boolean(null) là false, Boolean(object) là true. Nhờ vậy trạng thái mở
  // được suy ra từ orchid thay vì phải lưu thêm một state showModal.
  return (
    <Modal show={Boolean(orchid)} onHide={onClose} centered animation={false} contentClassName="orchid-modal">
      {/* Chỉ đọc orchid.name, orchid.image... khi object thật sự tồn tại. */}
      {orchid && (
        <>
          <div className="orchid-modal__image-wrap">
            <img src={orchid.image} alt={`${orchid.name} orchid detail`} onError={showFallback} />
            {orchid.isSpecial && <Badge className="orchid-modal__badge">Special collection</Badge>}
          </div>
          <Modal.Header closeButton>
            <div>
              <p className="eyebrow">{orchid.category}</p>
              <Modal.Title as="h2">{orchid.name}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <dl className="modal-facts">
              <div><dt>Origin</dt><dd>{orchid.origin}</dd></div>
              <div><dt>Color</dt><dd>{orchid.color}</dd></div>
              <div><dt>Rating</dt><dd>{orchid.rating} / 5</dd></div>
              <div><dt>Collection</dt><dd>{orchid.isSpecial ? 'Special' : 'Core'}</dd></div>
            </dl>
          </Modal.Body>
          <Modal.Footer>
            {/* Cả nút này và hành vi onHide đều gọi cùng callback đóng modal. */}
            <Button className="modal-close-button" onClick={onClose} aria-label="Close orchid details">
              Return to collection
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

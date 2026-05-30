// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = '0';
    }
}

// Checklist counter
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-item input');
    const message = document.querySelector('.check-message');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checked = document.querySelectorAll('.check-item input:checked').length;
            
            if (checked >= 2) {
                message.style.display = 'block';
            } else {
                message.style.display = 'none';
            }
        });
    });
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-main');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Redirect to checkout (placeholder)
            alert('Redirecionando para o checkout...');
        });
    }
});
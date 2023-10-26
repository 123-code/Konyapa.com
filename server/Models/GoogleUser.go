package models
import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)


type GoogleUserInfo struct {

	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Googleid string `json:"id"`
	Email string `json:"email"`
	Given_name string `json:"given_name"`
	Family_name string `json:"family_name"`
	Picture string `json:"picture"`
	Locale string `json:"locale"`
}


func (p *GoogleUserInfo) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()
	return nil
}
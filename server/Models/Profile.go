package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"

)




type Profile struct {
	gorm.Model
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    UserName  string `json:"name"`
	Email string `gorm:"uniqueIndex"` 

}

func (p *Profile) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()

	return nil
}
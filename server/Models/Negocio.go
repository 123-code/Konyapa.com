package models

import(
	"gorm.io/gorm"
    "github.com/google/uuid"
)

type NombreNegocio struct {
	gorm.Model
    ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    Nombre string `json:"name"`
    Productos string `json:"productos"`
	Direccion string `json:"direccion"`
	Web string `json:"web"`
	ProfileID  uuid.UUID `gorm:"foreignKey:ProfileID"`
}


func (p *NombreNegocio) BeforeCreate(tx *gorm.DB) error {
	p.ID = uuid.New()
	return nil
}
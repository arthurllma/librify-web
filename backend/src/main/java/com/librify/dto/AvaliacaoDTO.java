package com.librify.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AvaliacaoDTO {
    @NotNull @Min(1) @Max(5)
    private Integer nota;
    private String comentario;
}
